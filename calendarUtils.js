
    window.utilidadesCalendario = {
      esAñioBisiesto: function (año) {
        if (typeof año !== 'number' || !Number.isInteger(año)) {
          throw new Error('El año debe ser un número entero');
        }
        return (año % 4 === 0 && año % 100 !== 0) || (año % 400 === 0);
      },

      obtenerDiasEnMes: function (año, mes) {
        if (typeof año !== 'number' || typeof mes !== 'number') {
          throw new Error('El año y el mes deben ser números');
        }
        if (mes < 1 || mes > 12) {
          throw new Error('El mes debe estar entre 1 y 12');
        }
        return new Date(año, mes, 0).getDate();
      },

      generarMes: function (año, mes) {
        const diasEnMes = this.obtenerDiasEnMes(año, mes);
        const primerDia = new Date(año, mes - 1, 1).getDay();
        const calendario = [];

        for (let i = 0; i < primerDia; i++) {
          calendario.push(null);
        }

        for (let dia = 1; dia <= diasEnMes; dia++) {
          calendario.push(dia);
        }

        return calendario;
      },

      formatearFecha: function (fecha, formato) {
        if (!(fecha instanceof Date) || isNaN(fecha)) {
          throw new Error('Fecha inválida');
        }

        const mapa = {
          dd: String(fecha.getDate()).padStart(2, '0'),
          mm: String(fecha.getMonth() + 1).padStart(2, '0'),
          yyyy: fecha.getFullYear(),
          yy: String(fecha.getFullYear()).slice(-2),
          mesNombre: this.obtenerNombreMes(fecha.getMonth() + 1),
          diaNombre: this.obtenerNombreDia(fecha)
        };

        return formato.replace(/dd|mm|yyyy|yy|mesNombre|diaNombre/gi, m => mapa[m]);
      },

      obtenerNombreDia: function (fecha) {
        if (!(fecha instanceof Date) || isNaN(fecha)) {
          throw new Error('Fecha inválida');
        }

        const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        return dias[fecha.getDay()];
      },

      obtenerNombreMes: function (mes) {
        const meses = [
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        if (mes < 1 || mes > 12) throw new Error('Mes inválido');
        return meses[mes - 1];
      }
    };

    const utils = window.utilidadesCalendario;

    function generar() {
      const anio = parseInt(document.getElementById("anio").value);
      const mes = parseInt(document.getElementById("mes").value);
      const calendario = document.getElementById("calendario");
      const info = document.getElementById("info");
      const loading = document.getElementById("loading");

      // Mostrar loading
      loading.style.display = "block";
      calendario.style.display = "none";
      info.innerHTML = "";

      // Simular carga
      setTimeout(() => {
        // Limpiar contenido anterior
        calendario.innerHTML = "";

        // Validación
        if (isNaN(anio) || isNaN(mes) || mes < 1 || mes > 12) {
          alert("Ingresa un año válido y un mes entre 1 y 12.");
          loading.style.display = "none";
          return;
        }

        // Mostrar información
        const esBisiesto = utils.esAñioBisiesto(anio);
        const diasEnMes = utils.obtenerDiasEnMes(anio, mes);
        const nombreMes = utils.obtenerNombreMes(mes);
        info.innerHTML = `<strong>${nombreMes} ${anio}</strong> • ${diasEnMes} días • ${esBisiesto ? 'Año bisiesto' : 'Año común'}`;

        // Mostrar encabezado de días
        const encabezados = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        encabezados.forEach(d => {
          const div = document.createElement("div");
          div.textContent = d;
          div.className = "encabezado";
          calendario.appendChild(div);
        });

        // Generar días del mes
        const diasDelMes = utils.generarMes(anio, mes);
        const hoy = new Date();
        
        diasDelMes.forEach((dia, index) => {
          const div = document.createElement("div");
          
          if (dia === null) {
            div.className = "vacio";
            div.textContent = "";
          } else {
            div.textContent = dia;
            
            // Marcar el día actual
            if (anio === hoy.getFullYear() && mes === hoy.getMonth() + 1 && dia === hoy.getDate()) {
              div.classList.add("hoy");
            }
            
            // Marcar fines de semana
            const diaSemana = (index + 1) % 7;
            if (diaSemana === 0 || diaSemana === 1) {
              div.classList.add("fin-semana");
            }
            
            // Agregar evento click
            div.addEventListener('click', function() {
              const fecha = new Date(anio, mes - 1, dia);
              const fechaFormateada = utils.formatearFecha(fecha, 'diaNombre dd de mesNombre de yyyy');
              alert(`Seleccionaste: ${fechaFormateada}`);
            });
          }
          
          calendario.appendChild(div);
        });

        // Ocultar loading y mostrar calendario
        loading.style.display = "none";
        calendario.style.display = "grid";
      }, 500);
    }

    // Generar automáticamente al cargar
    document.addEventListener('DOMContentLoaded', generar);

    // Generar al presionar Enter en los inputs
    document.getElementById('anio').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') generar();
    });
    
    document.getElementById('mes').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') generar();
    });