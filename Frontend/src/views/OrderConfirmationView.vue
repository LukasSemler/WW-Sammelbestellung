<template>
  <section class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div
      class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"
    />
    <div
      class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"
    />
    <div class="mx-auto max-w-2xl lg:max-w-4xl">
      <img class="mx-auto h-52 mb-12" src="/logo3.png" alt="" />
      <h1 class="text-3xl font-bold tracking-tight text-wwGreen sm:text-4xl text-center">
        Vielen Danke für deine Bestellung!
      </h1>
      <figure class="mt-10">
        <blockquote
          class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"
        >
          <p>
            Du solltest in kürze eine E-Mail an deine angegebene E-Mail-Adresse erhalten. Dort
            siehst du nochmal eine Zusammenfassung deiner Bestellung. In dieser E-Mail erfährst du
            auch alle Informationen bezüglich der Bezahlung. Wenn ein Fehler aufgetreten ist, melde
            dich bitte bei uns.
          </p>
        </blockquote>
        <figcaption class="mt-10">
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              @click="router.push('/')"
              class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-wwDarkGreen"
              >Zu Home</a
            >
          </div>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { westwien } from '../Store/westwienStore';

const router = useRouter();
const store = westwien();
</script>
