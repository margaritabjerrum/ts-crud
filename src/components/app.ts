import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';

class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  constructor(selector: string) {
    const foundElement = document.querySelector(selector);

    if (foundElement === null) throw new Error(`Element was not found with selector '${selector}'`);

    if (!(foundElement instanceof HTMLElement)) {
      throw new Error(`HTML element was not found with selector '${selector}'`);
    }

    this.htmlElement = foundElement;

    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });
  }

  initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5';

    const table = new Table({
      title: 'All Cars',
      columns: {
        id: '#',
        brand: 'Brand',
        model: 'Model',
        year: 'Year',
        price: 'Price',
      },
      rowsData: this.carsCollection.allCars.map(stringifyProps),
    });

    container.append(table.htmlElement);
    this.htmlElement.append(container);
  };
}

export default App;
