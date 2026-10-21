const cases = [
  { tag: "SMS · BEZORGING", prompt: "Een sms zegt: ‘Je pakket wacht op je. Betaal vandaag € 1,99 via deze link, anders wordt het teruggestuurd.’ Wat doe je?", choices: ["Ik betaal meteen; het is maar een klein bedrag.", "Ik open de link niet en controleer de bezorging via de officiële app of site."], correct: 1, explain: "Goed gezien: onverwachte kosten, tijdsdruk en een link zijn samen reden om te pauzeren. Open zelf de officiële bezorgapp of website." },
  { tag: "CHAT · FAMILIE", prompt: "Een onbekend nummer appt: ‘Ik ben het, mijn telefoon is stuk. Kun je nu dringend geld voorschieten?’ Wat is de veiligste stap?", choices: ["Ik bel mijn familielid op het oude, bekende nummer om het verzoek te controleren.", "Ik maak het over; de uitleg klinkt geloofwaardig."], correct: 0, explain: "Precies. Een verzoek via een nieuw nummer controleer je via een tweede, vertrouwd kanaal. Laat je niet opjagen." },
  { tag: "E-MAIL · BANK", prompt: "Een e-mail met het logo van je bank vraagt om je wachtwoord en sms-code om ‘je account veilig te houden’. Wat doe je?", choices: ["Ik antwoord met de code zodat mijn rekening beschermd blijft.", "Ik deel geen codes en neem via de officiële bankapp of het nummer op mijn bankkaart contact op."], correct: 1, explain: "Juist. Deel nooit je wachtwoord of eenmalige code. Een logo of afzendernaam bewijst niet wie de e-mail echt stuurde." }
];
let current = 0, correct = 0;
const tag = document.querySelector("#scenarioTag"), prompt = document.querySelector("#scenario"), choices = document.querySelector("#choices"), feedback = document.querySelector("#feedback"), next = document.querySelector("#next"), quiz = document.querySelector(".quiz"), done = document.querySelector("#done");
function render() {
 const item = cases[current];
 document.querySelector("#progressText").textContent = `Situatie ${current + 1} van ${cases.length}`;
 document.querySelector("#progressBar").style.width = `${(current + 1) / cases.length * 100}%`;
 tag.textContent = item.tag; prompt.textContent = item.prompt; choices.replaceChildren(); feedback.hidden = true; next.hidden = true;
 item.choices.forEach((label, index) => { const button = document.createElement("button"); button.className = "choice"; button.textContent = label; button.addEventListener("click", () => answer(index)); choices.append(button); });
}
function answer(selected) {
 const item = cases[current];
 if (selected === item.correct) correct++;
 [...choices.children].forEach((button, index) => { button.disabled = true; if (index === item.correct) button.classList.add("correct"); else if (index === selected) button.classList.add("wrong"); });
 feedback.textContent = item.explain; feedback.hidden = false; next.hidden = false;
}
next.addEventListener("click", () => { current++; if (current === cases.length) { quiz.hidden = true; done.hidden = false; document.querySelector("#finalScore").textContent = `Je koos ${correct} van de ${cases.length} veiligste antwoorden. Elke keer even stoppen en controleren helpt.`; } else render(); });
render();
