const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async download(ctx) {
    const { id } = ctx.params; // ID del producto
    const userEmail = ctx.state.user?.email; // Email del usuario autenticado desde Clerk

    if (!userEmail) {
      return ctx.unauthorized(
        "Debes estar autenticado para descargar este archivo."
      );
    }

    // Verificar si el usuario ha comprado el producto
    const orders = await strapi.entityService.findMany("api::order.order", {
      filters: {
        email: userEmail,
        products: { id },
      },
    });

    if (orders.length === 0) {
      return ctx.forbidden("No tienes permiso para descargar este archivo.");
    }

    // Obtener el producto y su archivo asociado
    const product = await strapi.entityService.findOne(
      "api::product.product",
      id,
      {
        populate: ["DownloadFile"],
      }
    );

    if (!product?.DownloadFile?.length) {
      return ctx.notFound(
        "No se encontró el archivo asociado a este producto."
      );
    }

    // Redirigir al primer archivo descargable asociado
    const fileUrl = product.DownloadFile[0].url;
    ctx.redirect(fileUrl);
  },
}));
