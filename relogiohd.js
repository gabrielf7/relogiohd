/* Lista com nomes de mês e semana em Português
const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
*/

function CarregarRelogio() {
  // Descobrir o timeZoneName (Nome do Fuso Horário) //
  const opcoesHorarioNomeLocal = {
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
    let styledRelogioHD = window.document.createElement("link");
    styledRelogioHD.rel = "stylesheet"; styledRelogioHD.href = "./relogiohd.css";
    window.document.head.insertBefore(
      styledRelogioHD, window.document.head.lastElementChild
    );
  }

  // Informar o Nome do Fuso Horário
  function NomeDoFusoHorarioHJ() {
    let dataHjFH = new Date();
    let nomeFH = dataHjFH.toLocaleDateString("pt-br", opcoesHorarioNomeLocal).slice(2);
    document.getElementById("nomeDoHorario").innerHTML = `${nomeFH}`;
  }

  // Descobrir Data e Horario //
  function DataHorarioHJ(now) {
    let dataHj = new Date();
    let dateFormat = new Intl.DateTimeFormat([], opcoesHorario);
    let opcoesData = now === "datahj" ? dataHj : dateFormat.format(dataHj);
    return opcoesData;
  }

  // Informar Data de Hoje
  function InformarDataDeHJ() {
    let infodata = (op) => { return DataHorarioHJ("datahj").toLocaleDateString("pt-br", op) };
    let infoDataFormt = infodata(opcoesData);
    document.getElementById("dataHJ").textContent = `${infoDataFormt[0].toUpperCase()}${infoDataFormt.substring(1)}`;
  }

  // Relogio para o Body e o Head 
  function TempoDoRelogio() {
    document.getElementById("exibaHorarioTitle").innerHTML = `
    Horário BR - ${DataHorarioHJ("hr")}
    `;
    document.getElementById("exibaHorario").innerHTML = `${DataHorarioHJ("hr")}`;
    setTimeout(TempoDoRelogio, 1000);
  }

  // Executar
  InserirCSS();
  NomeDoFusoHorarioHJ();
  InformarDataDeHJ();
  TempoDoRelogio();
}

window.addEventListener("load", CarregarRelogio);
