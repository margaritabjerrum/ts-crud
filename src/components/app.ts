import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps from '../helpers/stringify-props';
import SelectField, { type Option } from './select-field';
import type Brand from '../types/brand';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const ALL_BRANDS_ID = '-1';
const ALL_BRANDS_TITLE = 'All Cars';
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
    container.className = 'container my-5 d-flex flex-column gap-4';

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

    const selectField = new SelectField({
      options: [
        { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...this.carsCollection.brands.map(brandToOption),
      ],
      onChange: (_, brandId, { text: brandTitle }) => {
        const selectedCars = brandId === ALL_BRANDS_ID
        ? this.carsCollection.allCars
        : this.carsCollection.getByBrandId(brandId);

        table.updateProps({
          rowsData: selectedCars.map(stringifyProps),
          title: brandTitle,
        });
      },
    });

    container.append(
      selectField.htmlElement,
      table.htmlElement,
      );
    this.htmlElement.append(container);
  };
}

export default App;
