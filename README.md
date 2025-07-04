# calendarioUtils
## Descripción
**Calendarioutils** es una librería JavaScript para el manejo y generación de calendarios. Permite calcular años bisiestos, obtener el número de días de un mes, generar visualmente un mes en formato calendario y formatear fechas de manera sencilla.  
Esta librería resuelve la necesidad de mostrar calendarios interactivos en aplicaciones web, facilitando la gestión de fechas y mejorando la experiencia del usuario al trabajar con fechas y calendarios.

## Instalación

Puedes incluir la librería en tu proyecto HTML de dos formas:

**1. Descarga directa:**  
Descarga el archivo calendarUtils.js y agrégalo a tu proyecto.

**2. Inclusión vía etiqueta <script>:**  
html
<script src="miLibreria.js"></script>

> Asegúrate de que la ruta del archivo JS corresponda con la ubicación real en tu proyecto.

---

## Uso
Aquí tienes un ejemplo de implementación en HTML y JavaScript usando la librería:
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Calendario Interactivo</title>
  <script src="calendarUtils.js"></script>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
      color: #333;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
    }

    h1 {
      text-align: center;
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 30px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .controles {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    label {
      font-weight: 600;
      color: #4a5568;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    input[type="number"] {
      padding: 12px 16px;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: white;
      width: 120px;
    }

    input[type="number"]:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }

    button {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    button:active {
      transform: translateY(0);
    }

    #info {
      text-align: center;
      font-size: 1.1rem;
      font-weight: 500;
      color: #4a5568;
      margin-bottom: 30px;
      padding: 16px;
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border-radius: 12px;
      border-left: 4px solid #667eea;
    }

    .calendario {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      max-width: 500px;
      margin: 0 auto;
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .calendario div {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .encabezado {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      cursor: default;
    }

    .vacio {
      background: transparent;
      cursor: default;
    }

    .calendario div:not(.encabezado):not(.vacio) {
      background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
      border: 2px solid #e2e8f0;
      font-size: 1rem;
      color: #2d3748;
    }

    .calendario div:not(.encabezado):not(.vacio):hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: scale(1.05);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
    }

    .hoy {
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%) !important;
      color: white !important;
      box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }

    .fin-semana {
      background: linear-gradient(135deg, #fed7e2 0%, #fbb6ce 100%) !important;
      color: #97266d !important;
    }

    .fin-semana:hover {
      background: linear-gradient(135deg, #d53f8c 0%, #b83280 100%) !important;
      color: white !important;
    }

    @media (max-width: 600px) {
      .container {
        padding: 20px;
        margin: 10px;
      }

      h1 {
        font-size: 2rem;
      }

      .controles {
        flex-direction: column;
        align-items: center;
      }

      .calendario {
        gap: 4px;
        padding: 15px;
      }

      input[type="number"] {
        width: 100px;
      }
    }

    .loading {
      display: none;
      text-align: center;
      padding: 20px;
    }

    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto 10px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📅 Calendario Interactivo</h1>

    <div class="controles">
      <div class="input-group">
        <label for="anio">Año</label>
        <input type="number" id="anio" value="2025" min="1">
      </div>
      
      <div class="input-group">
        <label for="mes">Mes</label>
        <input type="number" id="mes" value="7" min="1" max="12">
      </div>
      
      <div class="input-group">
        <label>&nbsp;</label>
        <button onclick="generar()">Generar Calendario</button>
      </div>
    </div>

    <div class="loading" id="loading">
      <div class="spinner"></div>
      <p>Generando calendario...</p>
    </div>

    <p id="info"></p>
    <div id="calendario" class="calendario"></div>
  </div>
</body>
</html>

## d. Capturas de pantalla


## e. Vídeo
https://drive.google.com/drive/folders/1p3wIxIgMfy9FxPcnA-1qC2AcapBhUAa0?usp=sharing

![Captura de pantalla 2025-07-04 140735](https://github.com/user-attachments/assets/c6980aa3-f6b3-4c9f-8552-533dbfe2a0c7)

## GITHUB PAGES
https://rubiss1118.github.io/mi-libreria/
