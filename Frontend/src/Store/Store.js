import { defineStore } from 'pinia';

import { EncryptStorage } from 'encrypt-storage';
const Encrypt = new EncryptStorage('AnmeldungFreigegenstaende_EncryptKEY');

//Die Funktion läuft intern bei allen actions ab um den State im localstorage zu speichern
function SaveState(abmelden) {
  const store = PiniaStore();

  //State speichern
  if (store.aktiverUser != null) {
    localStorage.setItem(store.$id, Encrypt.encryptString(JSON.stringify(store.$state)));
  } else if (abmelden) {
    localStorage.setItem(store.$id, Encrypt.encryptString(JSON.stringify(store.$state)));
  }
}

//MainStore
export const wwStore = defineStore('AnmeldungFreifaecher', {
  //State
  state: () => ({}),
  //Getter
  getters: {},
  //Actions
  actions: {},
});
