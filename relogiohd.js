/* Lista com nomes de mês e semana em Português
const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
*/

function CarregarRelogio() {
  // Pegar os seletores do relógio (Hora, Minuto e Segundo)
  let hora = window.document.querySelector("[data-ponteiro-hora]");
  let minuto = window.document.querySelector("[data-ponteiro-minuto]");
  let segundo = window.document.querySelector("[data-ponteiro-segundo]");
  
  // Descobrir Data Atual
  const dataAtual = () => new Date();

  // Descobrir o timeZoneName (Nome do Fuso Horário) //
  const nomeDoFusoHorario = {
    day: '2-digit',
    timeZoneName: "long"
  };

  // Formato para descobrir Data e Horario //
  const opcoesHorario = {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    second: "numeric",
  };
  const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Inserir o CSS com JS
  function InserirCSS() {
    const styledRelogioHD = window.document.createElement("link");
    styledRelogioHD.rel = "stylesheet"; styledRelogioHD.type = "text/css"; styledRelogioHD.href = "./relogiohd.css";
    window.document.head.insertBefore(
      styledRelogioHD, window.document.head.lastElementChild
    );
  }

  // Informar o Nome do Fuso Horário
  function NomeDoFusoHorario() {
    let nomeFH = dataAtual().toLocaleDateString("pt-br", nomeDoFusoHorario).slice(2);
    document.getElementById("nomeDoHorario").innerHTML = `${nomeFH}`;
  }

  // Descobrir Data e Horario //
  function DataHorarioHJ(hoje) {
    let formatoDeData = new Intl.DateTimeFormat([], opcoesHorario);
    let opcoesData = hoje === "datahj" ? dataAtual() : formatoDeData.format(dataAtual());
    return opcoesData;
  }

  // Informar Data de Hoje
  function InformarDataDeHJ() {
    let infoData = (op) => DataHorarioHJ("datahj").toLocaleDateString("pt-br", op);
    let infoDataFormt = infoData(opcoesData);
    document.getElementById("dataHJ").textContent = `${infoDataFormt[0].toUpperCase()}${infoDataFormt.substring(1)}`;
  }

  // Acrescendar 1 GRAU para cada segundo
  function setRotacao(elemento, rRotacao) {
    elemento.style.setProperty("--rotation", rRotacao * 360);
  }

  // Relogio para o Body e o Head 
  function TempoDoRelogio() {
    nomeDoFusoHorario.timeZoneName = "short";
    let pNomeDoFusoHorario = dataAtual().toLocaleDateString("pt-br", nomeDoFusoHorario).slice(2);
    document.getElementById("exibaHorarioTitle").innerHTML = `Horário ${pNomeDoFusoHorario} - ${DataHorarioHJ("hr")}`;

    const segundos = (dataAtual().getSeconds() / 60);
    const minutos = ((segundos + dataAtual().getMinutes()) / 60);
    const horas = ((minutos + dataAtual().getHours()) / 12);
    setRotacao(segundo, segundos);
    setRotacao(minuto, minutos);
    setRotacao(hora, horas);

    setTimeout(TempoDoRelogio, 1000);
  }

  // Executar
  InserirCSS();
  NomeDoFusoHorario();
  InformarDataDeHJ();
  TempoDoRelogio();
}

window.addEventListener("load", CarregarRelogio);
