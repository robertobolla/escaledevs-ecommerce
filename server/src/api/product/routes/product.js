"use strict";

/**
 * product router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::product.product", {
  routes: [
    {
      method: "GET",
      path: "/products/:id/download",
      handler: "product.download",
      config: {
        auth: true, // Requiere autenticación
      },
    },
  ],
});
