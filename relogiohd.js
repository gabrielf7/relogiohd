/* Lista com nomes de mês e semana em Português
const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
*/

function CarregarRelogio() {
  // Pegar Class do HTML
  let selectClass = (element) => window.document.querySelectorAll(element);
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

  // Estilo da Tag SPAN
  function EstiloBottomSpan(elemento01, elemento02) {
    selectClass(elemento01).forEach(element => element.setAttribute("class", `${elemento02}`));
  }

  // Imagem do Fundo da Página
  function InserirImagemDeFundo() {
    let hora = dataAtual().getHours();
    let linkImgFundo = window.document.getElementById("linkImgFundo");
    let classExiste = !!document.getElementsByClassName("bottomSpanNoite");
    let imgBody = window.document.getElementById("body-bg");
    if(hora < 6) {
      imgBody.setAttribute("class", "madrugada");
      EstiloBottomSpan(".bottomSpanDia", "bottomSpanNoite");
      linkImgFundo.setAttribute("href", "https://unsplash.com/photos/OxU08SFhPbI");
      linkImgFundo.textContent = "Image background created by Daniel Chekalov - Unsplash";
    } else if(hora < 13) {
      imgBody.setAttribute("class", "manha");
      classExiste === true ? EstiloBottomSpan(".bottomSpanNoite", "bottomSpanDia") : "";
      linkImgFundo.setAttribute("href", "https://unsplash.com/photos/bcLE7reXFLM");
      linkImgFundo.textContent = "Image background created by Toa Heftiba - Unsplash";
    } else if(hora < 18) {
      imgBody.setAttribute("class", "tarde");
      classExiste === true ? EstiloBottomSpan(".bottomSpanNoite", "bottomSpanDia") : "";
      linkImgFundo.setAttribute("href", "https://pixabay.com/pt/illustrations/paisagem-ilustra%c3%a7%c3%a3o-outono-mulher-4572804/");
      linkImgFundo.textContent = "Image background created by aalmeidah - Pixabay";
    } else if(hora < 24) {
      imgBody.setAttribute("class", "noite");
      EstiloBottomSpan(".bottomSpanDia", "bottomSpanNoite");
      linkImgFundo.setAttribute("href", "https://unsplash.com/photos/1SiXS0xQHTA");
      linkImgFundo.textContent = "Image background created by Lili Kovac - Unsplash";
    } else {
      window.document.body.style.backgroundColor = "#674A70";
    }
  }

  // Informar o Nome do Fuso Horário
  function NomeDoFusoHorario() {
    let nomeFH = dataAtual().toLocaleDateString("pt-br", nomeDoFusoHorario).slice(2);
    document.getElementById("nomeDoFusoHorario").innerHTML = `${nomeFH}`;
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
    document.getElementById("exibirHorarioTitle").innerHTML = `Horário ${pNomeDoFusoHorario} - ${DataHorarioHJ("hr")}`;

    if((dataAtual().getHours() == (5 || 12 || 17 || 23))){
      if((dataAtual().getMinutes() == 59) && (dataAtual().getSeconds() == 59)){
        InserirImagemDeFundo();
      }
    }

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
  InserirImagemDeFundo();
  NomeDoFusoHorario();
  InformarDataDeHJ();
  TempoDoRelogio();
}

window.addEventListener("load", CarregarRelogio);
