import Brand from '../types/brand';
import Car from '../types/car';
import CarJoined from '../types/car-joined';
import Model from '../types/model';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

class CarsCollection {
  private cars: Car[];

  private brands: Brand[];

  private models: Model[];

  constructor({
    cars,
    brands,
    models,
  }: CarsCollectionProps) {
    this.cars = JSON.parse(JSON.stringify(cars));
    this.brands = JSON.parse(JSON.stringify(brands));
    this.models = JSON.parse(JSON.stringify(models));
  }

  private joinCar = ({ modelId, ...car }: Car): CarJoined => {
    const carModel = this.models.find(({ id }) => id === modelId);
    const carBrand = this.brands.find(({ id }) => id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  public get allCars(): CarJoined[] {
    return this.cars.map(this.joinCar);
  }
}

export default CarsCollection;
