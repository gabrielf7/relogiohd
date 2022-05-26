/* Lista com nomes de mês e semana em Português
const mes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro","Outubro", "Novembro", "Dezembro"];
const semana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
*/

function CarregarRelogio() {
  // Pegar Class do HTML
  let selectClass = (element="") => window.document.querySelectorAll(element);
  // Pegar os seletores do relógio (Hora, Minuto e Segundo)
  const milissegundo = 1000;
  const hora = window.document.querySelector("[data-ponteiro-hora]");
  const minuto = window.document.querySelector("[data-ponteiro-minuto]");
  const segundo = window.document.querySelector("[data-ponteiro-segundo]");
  
  // Descobrir Data Atual
  const dataAtual = () => new Date();

  // Descobrir o timeZoneName (Nome do Fuso Horário)
  const nomeDoFusoHorario = {
    day: '2-digit',
    timeZoneName: "long"
  };

  // Formato para descobrir Data e Horario
  const opcoesHorario = {
    timeZone: 'America/Sao_Paulo',
    hour: 'numeric',
    minute: 'numeric',
    second: "numeric",
  };
  const opcoesData = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  // Formato designado para o nome do fuso horário
  function formatoDoFusoHorario(tamanho="") {
    nomeDoFusoHorario.timeZoneName = `${tamanho}`;
    return dataAtual().toLocaleDateString("pt-br", nomeDoFusoHorario).slice(2);
  }

  // Mudar a aparência do site de acordo com o horário do dia
  function EstiloDoDia(statusDoDia="", Autor="", Site="", link="") {
    let imgBody = window.document.getElementById("body-bg");
    let linkImgFundo = window.document.getElementById("linkImgFundo");
    
    imgBody.setAttribute("class", `${statusDoDia}`);
    linkImgFundo.setAttribute("href", link);
    linkImgFundo.textContent = `Image background created by ${Autor} - ${Site}`;
  }

  // Estilo da Tag SPAN
  function EstiloBottomSpan(classInicial="", classFinal="") {
    selectClass(classInicial).forEach(element => element.setAttribute("class", classFinal));
  }
  
  // Imagem do Fundo da Página
  function InserirImagemDeFundo() {
    let hora = dataAtual().getHours();
    let classExiste = !!document.getElementsByClassName("bottomSpanNoite");
    if(hora < 6) {
      EstiloDoDia("madrugada", "Daniel Chekalov", "Unsplash",
        "https://unsplash.com/photos/OxU08SFhPbI"
      );
      EstiloBottomSpan(".bottomSpanDia", "bottomSpanNoite");
    } else if(hora < 13) {
      EstiloDoDia("manha", "Toa Heftiba", "Unsplash",
        "https://unsplash.com/photos/bcLE7reXFLM"
      );
      classExiste === true ? EstiloBottomSpan(".bottomSpanNoite", "bottomSpanDia") : "";
    } else if(hora < 18) {
      EstiloDoDia("tarde", "aalmeidah", "Pixabay",
        "https://pixabay.com/pt/illustrations/paisagem-ilustra%c3%a7%c3%a3o-outono-mulher-4572804/"
      );
      classExiste === true ? EstiloBottomSpan(".bottomSpanNoite", "bottomSpanDia") : "";
    } else if(hora < 24) {
      EstiloDoDia("noite", "Lili Kovac", "Unsplash",
        "https://unsplash.com/photos/1SiXS0xQHTA"
      );
      EstiloBottomSpan(".bottomSpanDia", "bottomSpanNoite");
    } else {
      window.document.body.style.backgroundColor = "#0d0d0e";
    }
  }

  // Informar o nome do fuso horário
  function NomeDoFusoHorario() {
    let lNomeDoFusoHorario = formatoDoFusoHorario("long");
    document.getElementById("nomeDoFusoHorario").textContent = `${lNomeDoFusoHorario}`;
  }

  // Descobrir data e horário
  function DataHorarioHJ(hoje="") {
    let formatoDeData = new Intl.DateTimeFormat([], opcoesHorario);
    let opcoesData = hoje === "datahj" ? dataAtual() : formatoDeData.format(dataAtual());
    return opcoesData;
  }

  // Informar data de hoje
  function InformarDataDeHJ() {
    let infoData = (op) => DataHorarioHJ("datahj").toLocaleDateString("pt-br", op);
    let infoDataFormt = infoData(opcoesData);
    document.getElementById("dataHJ").textContent = `${infoDataFormt[0].toUpperCase()}${infoDataFormt.substring(1)}`;
  }

  // Inserir horário na tag title
  function InserirTextoNoTitle() {
    const pNomeDoFusoHorario = formatoDoFusoHorario("short");
    document.getElementById("exibirHorarioTitle").textContent = `Horário ${pNomeDoFusoHorario} - ${DataHorarioHJ("hr")}`;
  }

  // Mudar automaticamente a imagem de fundo de acordo com o horário do dia
  function statusDoDia() {
    if((dataAtual().getHours() == 5) || (dataAtual().getHours() == 12) ||
      (dataAtual().getHours() == 17) || (dataAtual().getHours() == 23)
    ){
      if((dataAtual().getMinutes() == 59) && (dataAtual().getSeconds() == 59)){
        InserirImagemDeFundo();
      }
    }
  }

  // Acrescendar 1 grau para cada segundo
  function setRotacao(elemento=any, rRotacao=0) {
    elemento.style.setProperty("--rotation", rRotacao * 360);
  }

  // Relógio para o Body e o Head 
  function TempoDoRelogio() {
    InserirTextoNoTitle();
    statusDoDia();

    const segundos = (dataAtual().getSeconds() / 60);
    const minutos = ((segundos + dataAtual().getMinutes()) / 60);
    const horas = ((minutos + dataAtual().getHours()) / 12);
    setRotacao(segundo, segundos);
    setRotacao(minuto, minutos);
    setRotacao(hora, horas);

    setTimeout(TempoDoRelogio, milissegundo);
  }

  // Executar
  InserirImagemDeFundo();
  NomeDoFusoHorario();
  InformarDataDeHJ();
  TempoDoRelogio();
}

window.addEventListener("load", CarregarRelogio);
