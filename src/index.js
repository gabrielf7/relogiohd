function carregar() {

  let hora = window.document.querySelector("[data-ponteiro-hora]");
  let minuto = window.document.querySelector("[data-ponteiro-minuto]");
  let segundo = window.document.querySelector("[data-ponteiro-segundo]");

  function setRotacao(elemento, rRotacao) {
    elemento.style.setProperty("--rotation", rRotacao * 360);
  }

  function setDataAtual() {
    const dataAtual = new Date();
    const segundos = dataAtual.getSeconds() / 60;
    const minutos = (segundos + dataAtual.getMinutes()) / 60;
    const horas = (minutos + dataAtual.getHours()) / 12;

    setRotacao(segundo, segundos);
    setRotacao(minuto, minutos);
    setRotacao(hora, horas);
  }

  setInterval(setDataAtual, 1000);
  setDataAtual();
}

window.addEventListener("load", carregar);