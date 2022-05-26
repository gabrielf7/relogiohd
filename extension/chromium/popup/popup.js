window.addEventListener("load", carregarPopup);

function carregarPopup() {
  const btnPausar = window.document.getElementById("btnPausar");
  const MESSAGE = "desativado";

  btnPausar.addEventListener("click", buttonPausar);
  
  async function buttonPausar() {
    chrome.runtime.sendMessage({ message: MESSAGE });
  }
}

