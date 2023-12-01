import { defineStore } from 'pinia';

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
    warenkorb: [],
    aktiveSammelbestellung: false,
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
    addProductToWarenkorb(product) {
      this.warenkorb.push(product);
      SaveState();
    },
    deleteProductFromWarenkorb(product) {
      this.warenkorb.splice(this.warenkorb.indexOf(product), 1);
      SaveState();
    },
    changeProductInWarenkorb(product) {
      this.warenkorb[this.warenkorb.indexOf(product)] = product;
      SaveState();
    },
    setSammelbestellung(status) {
      this.aktiveSammelbestellung = status;
      SaveState();
    },
    clearBasket() {
      this.warenkorb = [];
      SaveState();
    },
  },
});
