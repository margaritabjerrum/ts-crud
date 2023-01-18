import CarsCollection from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table from './table';
import stringifyProps, { type StringifiedObject } from '../helpers/stringify-props';
import SelectField, { type Option, type SelectFieldProps } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';

const brandToOption = ({ id, title }: Brand): Option => ({
  value: id,
  text: title,
});

const ALL_BRANDS_ID = '-1';
const ALL_BRANDS_TITLE = 'All Cars';
class App {
  private htmlElement: HTMLElement;

  private carsCollection: CarsCollection;

  private carsTable: Table<StringifiedObject<CarJoined>>;

  private selectedBrandId: string;

  constructor(selector: string) {
    const foundElement = document.querySelector(selector);

    if (foundElement === null) throw new Error(`Element was not found with selector '${selector}'`);

    if (!(foundElement instanceof HTMLElement)) {
      throw new Error(`HTML element was not found with selector '${selector}'`);
    }

    this.htmlElement = foundElement;
    this.selectedBrandId = ALL_BRANDS_ID;
    this.carsCollection = new CarsCollection({
      cars,
      brands,
      models,
    });

    this.carsTable = new Table({
      title: 'All Cars',
      columns: {
        id: '#',
        brand: 'Brand',
        model: 'Model',
        year: 'Year',
        price: 'Price',
      },
      rowsData: this.carsCollection.allCars.map(stringifyProps),
      onDelete: this.handleCarDelete,
    });
  }

  private handleCarDelete = (carId: string): void => {
    this.carsCollection.deleteCarById(carId);
    this.update();
  };

  private handleBrandChange: SelectFieldProps['onChange'] = (_, brandId) => {
    this.selectedBrandId = brandId;
    this.update();
  };

  public initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-4';

    const selectField = new SelectField({
      options: [
        { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...this.carsCollection.brands.map(brandToOption),
      ],
      onChange: this.handleBrandChange,
    });

    container.append(
      selectField.htmlElement,
      this.carsTable.htmlElement,
      );
    this.htmlElement.append(container);
  };

  public update = () => {
    const selectedCars = this.selectedBrandId === ALL_BRANDS_ID
    ? this.carsCollection.allCars
    : this.carsCollection.getByBrandId(this.selectedBrandId);

    const brandTitle = this.selectedBrandId === ALL_BRANDS_ID
      ? ALL_BRANDS_TITLE
      : this.carsCollection.getCarById(this.selectedBrandId).title;

    this.carsTable.updateProps({
      rowsData: selectedCars.map(stringifyProps),
      title: brandTitle,
    });
  };
}

export default App;
