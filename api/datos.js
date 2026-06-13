// Guardamos el estado en memoria global de la función (temporal)
let datosProyecto = {
  universidad: "Universidad Nacional de Avellaneda",
  estadoESP32: "Desconectado",
  ultimaActualizacion: "Nunca"
};

export default function handler(req, res) {
  // Habilitar CORS para evitar bloqueos del navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Si el ESP32 envía datos (POST)
  if (req.method === 'POST') {
    const { estado } = req.body;
    datosProyecto.estadoESP32 = estado || "Conectado";
    datosProyecto.ultimaActualizacion = new Date().toLocaleString("es-AR", { timeZone: "America/Buenos_Aires" });
    return res.status(200).json({ mensaje: "Datos recibidos correctamente" });
  }

  // Si el navegador web pide datos (GET)
  if (req.method === 'GET') {
    return res.status(200).json(datosProyecto);
  }

  return res.status(405).json({ error: "Método no permitido" });
}
