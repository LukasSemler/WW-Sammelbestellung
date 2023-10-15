<template>
  <!-- <div class="relative isolate overflow-hidden bg-white">
    <div class="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-wwGreen sm:text-4xl">
          Vielen Dank <br />
          fuer deine Bestellung !
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-900">
          Du solltest in kurze eine Email an deine angegeben Emailadresse erhalten. Dort siehst du
          nochmal eine Zusammenfassung deiner Bestellung. In dieser Email erfaehrst du auch alle
          Informationen bezueglich der Bezahlung. Wenn ein Fehler aufgetreten ist, melde dich bitte
          bei uns.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >Get started</a
          >
          <a href="#" class="text-sm font-semibold leading-6 text-wwGray"
            >Learn more <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
    </div>
    <svg
      viewBox="0 0 1024 1024"
      class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
      aria-hidden="true"
    >
      <circle
        cx="512"
        cy="512"
        r="512"
        fill="url(#8d958450-c69f-4251-94bc-4e091a323369)"
        fill-opacity="0.7"
      />
      <defs>
        <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
          <stop stop-color="#9BCF39" />
          <stop offset="1" stop-color="#6B8F28" />
        </radialGradient>
      </defs>
    </svg>
  </div> -->

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
        Vielen Danke fuer deine Bestellung!
      </h1>
      <figure class="mt-10">
        <blockquote
          class="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9"
        >
          <p>
            Du solltest in kurze eine E-Mail an deine angegebene E-Mail-Adresse erhalten. Dort
            siehst du nochmal eine Zusammenfassung deiner Bestellung. In dieser E-Mail erfährst du
            auch alle Informationen bezüglich der Bezahlung. Wenn ein Fehler aufgetreten ist, melde
            dich bitte bei uns.
          </p>
        </blockquote>
        <figcaption class="mt-10">
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              @click="router.push('/')"
              class="rounded-md bg-wwGreen px-3.5 py-2.5 text-sm font-semibold text-gray-100 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
