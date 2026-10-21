const message = document.querySelector("#message");
const counter = document.querySelector("#counter");
const error = document.querySelector("#error");
const results = document.querySelector("#results");
const rules = [
  { id: "urgent", title: "Er wordt druk gezet om snel te handelen", patterns: [/binnen\s+(?:\d+\s*)?(?:uur|minuten|minuut|dag|dagen)/i, /onmiddellijk/i, /onmiddelijk/i, /nu\s+direct/i, /laatste\s+(?:kans|herinnering)/i, /vervalt\s+(?:vandaag|binnenkort)/i, /account.{0,25}(?:geblokkeerd|opgeschort)/i], advice: "Dringende tijdsdruk kan bedoeld zijn om je zonder nadenken te laten handelen." },
  { id: "money", title: "Er wordt om geld of een betaling gevraagd", patterns: [/betaal\s+(?:nu|direct)/i, /overschrijf/i, /maak\s+.*(?:over|geld)/i, /\b(?:€|eur)\s?\d/i, /openstaande\s+(?:factuur|betaling|boete)/i, /betaalverzoek/i, /cadeaubon/i, /gift\s*card/i], advice: "Controleer betaalverzoeken via de officiële app of website van de organisatie." },
  { id: "credential", title: "Het bericht vraagt om inlog- of betaalgegevens", patterns: [/wachtwoord/i, /verificatiecode/i, /bevestig\s+(?:je|uw)\s+(?:gegevens|identiteit)/i, /kaartgegevens/i, /bankgegevens/i, /pincode/i, /inloggegevens/i], advice: "Deel nooit een wachtwoord, pincode of eenmalige verificatiecode via een bericht." },
  { id: "link", title: "Er staat een link om op te klikken", patterns: [/(?:https?:\/\/|www\.)[^\s]+/i, /klik\s+(?:hier|op\s+de\s+link)/i, /via\s+de\s+link/i], advice: "Open de website zelf via een adres dat je kent; gebruik de link in het bericht niet." },
  { id: "identity", title: "De afzender doet zich voor als een bekende organisatie", patterns: [/\b(?:bank|bpost|postnl|itsme|belastingdienst|politie|payconiq|microsoft|amazon|bol\.com)\b/i], advice: "Een bekende naam in de tekst bewijst niet wie het bericht echt heeft verstuurd." },
  { id: "prize", title: "Er wordt een prijs of onverwachte beloning beloofd", patterns: [/\b(?:gewonnen|winnaar|prijs|loterij|gratis cadeau|gefeliciteerd)\b/i], advice: "Wees voorzichtig met onverwachte prijzen waarvoor je eerst gegevens of geld moet geven." }
];

function analyze(text) {
  return rules.filter(rule => rule.patterns.some(pattern => pattern.test(text)));
}
function showResults(findings) {
  const list = document.querySelector("#findingList");
  const count = findings.length;
  document.querySelector("#score").textContent = count;
  document.querySelector("#meter").style.setProperty("--angle", `${Math.min(count / rules.length, 1) * 360}deg`);
  document.querySelector("#resultTitle").textContent = count ? "Er zijn signalen om te controleren" : "Geen duidelijke signalen gevonden";
  document.querySelector("#riskLabel").textContent = count >= 3 ? "Meerdere waarschuwingssignalen" : count ? "Een paar dingen verdienen aandacht" : "Geen bekende tekstsignalen gevonden";
  document.querySelector("#summary").textContent = count ? "Lees hieronder waarom deze onderdelen opvallen." : "Dit is geen garantie dat het bericht veilig is. Controleer de afzender zelf.";
  list.replaceChildren();
  const items = findings.length ? findings.map(rule => ({ title: rule.title, advice: rule.advice })) : [{ title: "Geen van de herkenningsregels is geactiveerd.", advice: "Controleer de afzender en het verzoek zelf via een officieel kanaal." }];
  for (const item of items) {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = item.title;
    li.append(title, document.createElement("br"), document.createTextNode(item.advice));
    if (!findings.length) li.classList.add("all-clear");
    list.append(li);
  }
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

message.addEventListener("input", () => { counter.textContent = `${message.value.length} / 5000`; });
document.querySelector("#checkButton").addEventListener("click", () => {
  error.textContent = "";
  const text = message.value.trim();
  if (text.length < 8) { error.textContent = "Plak eerst een bericht van minstens 8 tekens."; message.focus(); return; }
  showResults(analyze(text));
});
function reset() { message.value = ""; counter.textContent = "0 / 5000"; error.textContent = ""; results.hidden = true; message.focus(); }
document.querySelector("#clearButton").addEventListener("click", reset);
document.querySelector("#againButton").addEventListener("click", reset);


