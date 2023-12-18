import { makeAutoObservable } from "mobx";

class BreedStore {
  breeds: [] = [];
  collapsedSections: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBreeds(breeds: []) {
    this.breeds = breeds;
  }

  setCollapsedSections(collapsedSections: number[]) {
    this.collapsedSections = collapsedSections;
  }

  toggleSection(index: number) {
    if (this.collapsedSections.includes(index)) {
      this.collapsedSections = this.collapsedSections.filter(
        (i) => i !== index
      );
    } else {
      this.collapsedSections = [...this.collapsedSections, index];
    }
  }
}

export const breedStore = new BreedStore();
