const jwt = require("jsonwebtoken");

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Log de la clave pública cargada desde el archivo .env
    console.log("Clave pública cargada:", process.env.CLERK_JWT_PUBLIC_KEY);

    // Extraer el encabezado Authorization de la solicitud
    const authHeader = ctx.request.headers.authorization;

    // Log para verificar si el encabezado Authorization está presente
    console.log("Encabezado Authorization:", authHeader);

    // Validar que el encabezado Authorization esté presente y tenga el formato correcto
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error(
        "Error: El encabezado Authorization está ausente o no es válido."
      );
      return ctx.unauthorized("Falta el token de autorización.");
    }

    // Extraer el token del encabezado
    const token = authHeader.split(" ")[1];
    console.log("Token recibido:", token); // Log del token recibido

    try {
      // Verificar el token JWT con la clave pública de Clerk
      const payload = jwt.verify(token, process.env.CLERK_JWT_PUBLIC_KEY);
      console.log("Payload del token:", payload); // Log del contenido decodificado del token

      // Validar que el token contiene un email
      if (typeof payload === "object" && payload.email) {
        ctx.state.user = {
          id: payload.sub, // ID único del usuario
          email: payload.email, // Email del usuario
        };
        console.log("Usuario autenticado:", ctx.state.user); // Log del usuario autenticado
      } else {
        console.error("El token no contiene información válida.");
        return ctx.unauthorized("El token no contiene información válida.");
      }

      // Pasar al siguiente middleware
      await next();
    } catch (error) {
      console.error("Error al verificar el token:", error.message); // Log del error de verificación
      return ctx.unauthorized("Token inválido o expirado.");
    }
  };
};
