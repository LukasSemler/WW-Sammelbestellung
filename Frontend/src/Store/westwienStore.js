import { defineStore } from 'pinia';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//Die Funktion läuft intern bei allen actions ab um den State im localstorage zu speichern
function SaveState(abmelden) {
  const store = westwien();

  //State speichern
  if (store.aktiverUser != null) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  } else if (abmelden) {
    localStorage.setItem(store.$id, JSON.stringify(store.$state));
  }
}

export const westwien = defineStore('westwien', {
  state: () => ({
    aktiverUser: null,
  }),
  getters: {
    getAktivenUser() {
      return this.aktiverUser;
    },
  },
  actions: {
    setAktivenUser(user) {
      console.log(user);
      this.aktiverUser = user;
      SaveState();
    },
    deleteAktivenUser() {
      this.aktiverUser = null;
      SaveState(true);
    },
  },
});
