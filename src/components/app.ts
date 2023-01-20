import CarsCollection, { type CarProps } from '../helpers/cars-collection';
import cars from '../data/cars';
import brands from '../data/brands';
import models from '../data/models';
import Table, { type TableProps, type TableRowData } from './table';
import stringifyProps, { type StringifiedObject } from '../helpers/stringify-props';
import SelectField, { type Option, type SelectFieldProps } from './select-field';
import type Brand from '../types/brand';
import type CarJoined from '../types/car-joined';
import CarForm, { type Values } from './car-form';

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

  private editedCarId: string | null;

  constructor(selector: string) {
    const foundElement = document.querySelector(selector);

    if (foundElement === null) throw new Error(`Element was not found with selector '${selector}'`);

    if (!(foundElement instanceof HTMLElement)) {
      throw new Error(`HTML element was not found with selector '${selector}'`);
    }

    this.htmlElement = foundElement;
    this.selectedBrandId = ALL_BRANDS_ID;
    this.editedCarId = null;

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
      editedCarId: this.editedCarId,
      onDelete: this.handleCarDelete,
      onEdit: this.handleCarEdit,
    });
  }

  private handleCarDelete: TableProps<TableRowData>['onDelete'] = (carId) => {
    this.carsCollection.deleteCarById(carId);
    this.update();
  };

  private handleBrandChange: SelectFieldProps['onChange'] = (_, brandId) => {
    this.selectedBrandId = brandId;
    this.update();
  };

  private handleCarEdit: TableProps<TableRowData>['onEdit'] = (carId) => {
    const carIsAlreadyEdited = this.editedCarId === carId;
    this.editedCarId = carIsAlreadyEdited ? null : carId;
    this.update();
  };

  private handleCarCreate = ({
    brand, model, price, year,
  }: Values): void => {
    const carProps: CarProps = {
      brandId: brand,
      modelId: model,
      price: Number(price),
      year: Number(year),
    };

    this.carsCollection.add(carProps);

    this.update();
  };

  public initialize = (): void => {
    const container = document.createElement('div');
    container.className = 'container my-5 d-flex flex-column gap-4';

    const uxContainer = document.createElement('div');
    uxContainer.className = 'd-flex justify-content-center gap-4 align-items-start';

    const selectField = new SelectField({
      options: [
        { text: ALL_BRANDS_TITLE, value: ALL_BRANDS_ID },
        ...this.carsCollection.brands.map(brandToOption),
      ],
      onChange: this.handleBrandChange,
    });

    const carForm = new CarForm({
      title: 'Add New Car',
      submitBtnText: 'Add',
      values: {
        brand: '',
        model: '',
        price: '',
        year: '',
      },
      onSubmit: this.handleCarCreate,
    });

    uxContainer.append(
      this.carsTable.htmlElement,
      carForm.htmlElement,
      );

    container.append(
      selectField.htmlElement,
      uxContainer,
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
      title: brandTitle,
      rowsData: selectedCars.map(stringifyProps),
      editedCarId: this.editedCarId,
    });
  };
}

export default App;
