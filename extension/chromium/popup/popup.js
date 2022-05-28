window.addEventListener("load", carregarPopup);

function carregarPopup() {
  const btnPausar = window.document.getElementById("btnPausar");
  const MESSAGE = "desativado";
  const STATUS_MESSAGE = "Pausar Extensão";

  btnPausar.addEventListener("click", buttonPausar);
  
  async function buttonPausar() {
    chrome.runtime.sendMessage({ message: MESSAGE }, function () {
      console.log({ status: STATUS_MESSAGE });
    });
  }
}
