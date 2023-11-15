<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
      <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Häufig gestellte Fragen
      </h2>
      <p class="mt-6 max-w-2xl text-base leading-7 text-gray-600">
        Hier findest du Antworten auf häufig gestellte Fragen. Solltest du keine Antwort auf deine
        Frage finden, kannst du uns jederzeit gerne per
        <a
          href="mailto: t.ruzek@handball-westwien.at"
          class="font-semibold text-wwGreen hover:text-wwDarkGreen"
          >Email</a
        >
        erreichen.
      </p>
      <div class="mt-20">
        <dl
          class="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:grid-cols-3 lg:gap-x-10"
        >
          <div v-for="faq in faqs" :key="faq.id">
            <dt class="text-base font-semibold leading-7 text-gray-900">{{ faq.question }}</dt>
            <dd class="mt-2 text-base leading-7 text-gray-600">{{ faq.answer }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    id: 1,
    question: 'Wie lange dauert es bis ich meine Bestellung bekommen?',
    answer:
      'Das kommt ganz darauf an wann du Bestellst. Am Ende der Bestellfrist (sichtbar auf der Produkt-Seite), bestellen wir die Produkte bei 11-Teamsports. Danach dauert es üblicherweise 2-3 Wochen bis wir die Produkte erhalten.',
  },
  {
    id: 2,
    question: 'Kann ich meine Bestellung umtauschen?',
    answer: 'Nein, leider ist das nicht Möglich.',
  },
  {
    id: 3,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  {
    id: 4,
    question: 'Was mache ich, wenn ein Artikel nicht lieferbar ist?',
    answer:
      'Wenn ein Produkt nicht lieferbar ist oder nicht verfügbar ist, werden wir dich per Email kontaktieren und dir den Preis von dem Produkt zurücküberweisen.',
  },
  {
    id: 5,
    question: 'Wie bezahle ich meine Bestellung?',
    answer:
      'In der Bestellbestätigung findest du unsere Bankverbindung. Bitte überweise den Gesamtbetrag deiner Bestellung auf unser Konto. Bitte gib als Verwendungszweck deine Bestellnummer oder deinen Namen an.',
  },
  {
    id: 6,
    question: 'Wann wird die nächste Bestellmöglichkeit sein?',
    answer: '????',
  },
  {
    id: 7,
    question: 'Ich habe mich in der Größe geirrt, was kann ich tun?',
    answer:
      'Wenn die Bestellfrist noch nicht abgelaufen ist, melde dich bitte bei uns, so dass wir die Größe ändern können. Wenn die Bestellfrist vorbei ist, können wir leider nichts mehr ändern.',
  },
  {
    id: 7,
    question: 'Kann ich nach der Bestellfrist noch bestellen?',
    answer:
      'Prinzipell ja, nur werden deine Produkte erst bei der nächsten Sammelbestellung bestellt. Das könnte dann mehrere Wochen dauern. Wenn du das Produkt schnell benötigt, dann Bestelle es direkt über die 11-Teamsport-Seite. Den Link dazu findest du auf der Webseite.',
  },
  {
    id: 8,
    question: 'Wie werden die Produkte ausgeteilt?',
    answer:
      'Die Bestellungen werden jeweils bei einem Heimspiel ausgegeben. Wir informieren euch aber davor per Email bei welchem Spiel ihr eure Bestellung abholen könnt.',
  },
];
</script>
