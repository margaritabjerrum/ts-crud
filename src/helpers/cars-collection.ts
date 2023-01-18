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
  private privateCars: Car[];

  private privateBrands: Brand[];

  private privateModels: Model[];

  constructor({
    cars,
    brands,
    models,
  }: CarsCollectionProps) {
    this.privateCars = JSON.parse(JSON.stringify(cars));
    this.privateBrands = JSON.parse(JSON.stringify(brands));
    this.privateModels = JSON.parse(JSON.stringify(models));
  }

  public get allCars(): CarJoined[] {
    return this.privateCars.map(this.joinCar);
  }

  public get brands(): Brand[] {
    return JSON.parse(JSON.stringify(this.privateBrands));
  }

  private joinCar = ({ modelId, ...car }: Car): CarJoined => {
    const carModel = this.privateModels.find(({ id }) => id === modelId);
    const carBrand = this.privateBrands.find(({ id }) => id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  public deleteCarById = (carId: string): void => {
    this.privateCars = this.privateCars.filter((car) => car.id !== carId);
  };

  public getByBrandId = (brandId: string): CarJoined[] => {
    const brandModelsIds = this.privateModels
      .filter((model) => model.brandId === brandId)
      .map((model) => model.id);

    const joindCars = this.privateCars
      .filter((car) => brandModelsIds.includes(car.modelId))
      .map(this.joinCar);

      return joindCars;
  };

  public getCarById = (brandId: string): Brand => {
    const brand = this.privateBrands.find(({ id }) => id === brandId);

    if (brand === undefined) {
      throw new Error(`Brand with ID '${brandId}' was not found`);
    }

    return brand;
  };
}

export default CarsCollection;
