document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const content = document.getElementById('content');
  const clock = document.getElementById('clock');

  // ⏰ Actualizar el reloj en la barra de estado
  function updateClock() {
    const now = new Date();
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    };
    clock.textContent = now.toLocaleString('es-ES', options);
  }

  setInterval(updateClock, 1000);
  updateClock();

  // 💻 Manejar entrada de comandos
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const command = input.value.trim();

      // 📌 Mostrar el comando ingresado en la terminal
      const promptElement = document.createElement('div');
      promptElement.classList.add('prompt-line');
      promptElement.innerHTML = `<span class="prompt-symbol">root@break-fix:~$</span> ${command}`;
      content.insertBefore(promptElement, document.querySelector('.prompt'));

      let response = '';

      switch(command) {
        case '1':
        case 'iniciar':
          response = 'Iniciando sistema Break & Fix...\n\n' +
                     '[OK] Depurador cargado\n\n' +
                     '[OK] Herramientas listas\n\n' +
                     '[OK] Sistema preparado';
          break;
        case '2':
        case 'ayuda':
          response = 'AYUDA DE BREAK & FIX:\n\n' +
                     '[1] Iniciar - Comienza una nueva sesión de depuración\n\n' +
                     '[2] Ayuda - Muestra este mensaje de ayuda\n\n' +
                     '[3] Opciones - Configura parámetros del sistema\n\n' +
                     '[4] Salir - Cierra el programa';
          break;
        case '3':
        case 'opciones':
          response = 'OPCIONES DE SISTEMA:\n\n' +
                     '- Modo oscuro: Activado\n\n' +
                     '- Nivel de diagnóstico: Alto\n\n' +
                     '- Registro de errores: Activado\n\n' +
                     '- Notificaciones: Desactivadas';
          break;
        case '4':
        case 'salir':
          response = 'Cerrando el sistema...\n\n¡Hasta pronto!';
          break;
        case 'clear':
        case 'cls':
          // 🔥 Limpiar solo el historial de comandos
          const history = document.querySelectorAll('.prompt-line, .response');
          history.forEach(element => element.remove());

          // 📌 Volver a mostrar un nuevo prompt
          const newPrompt = document.createElement('div');
          newPrompt.classList.add('prompt-line');
          newPrompt.innerHTML = `<span class="prompt-symbol">root@break-fix:~$</span>`;
          content.insertBefore(newPrompt, document.querySelector('.prompt'));

          input.value = '';
          return;
        default:
          response = `Comando no reconocido: "${command}".\n\nEscribe "ayuda" para ver los comandos disponibles.`;
      }

      // 📌 Crear un elemento para la respuesta con saltos de línea correctos
      const responseElement = document.createElement('div');
      responseElement.className = 'response';
      responseElement.innerHTML = response.replace(/\n/g, '<br>');

      content.insertBefore(responseElement, document.querySelector('.prompt'));

      // Limpiar la entrada después de enviar el comando
      input.value = '';

      // 📜 Desplazar la terminal automáticamente hacia abajo
      document.querySelector('.terminal').scrollTop = document.querySelector('.terminal').scrollHeight;
    }
  });

  // 🖱️ Hacer que la terminal pueda recibir el foco al hacer clic
  document.querySelector('.terminal').addEventListener('click', function() {
    input.focus();
  });
});
