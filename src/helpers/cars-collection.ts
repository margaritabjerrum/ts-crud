import Brand from '../types/brand';
import Car from '../types/car';
import CarJoined from '../types/car-joined';
import Model from '../types/model';

type CarsCollectionProps = {
  cars: Car[],
  brands: Brand[],
  models: Model[],
};

export type CarProps = {
  brandId: string,
  modelId: string,
  price: number,
  year: number
};

const createId = (): string => String(Math.floor(Math.random() * 100000000000000));

class CarsCollection {
  constructor(private props: CarsCollectionProps) { }

  public get allCars(): CarJoined[] {
    return this.props.cars.map(this.joinCar);
  }

  public get brands(): Brand[] {
    return JSON.parse(JSON.stringify(this.props.brands));
  }

  private joinCar = ({ modelId, ...car }: Car): CarJoined => {
    const carModel = this.props.models.find(({ id }) => id === modelId);
    const carBrand = this.props.brands.find(({ id }) => id === carModel?.brandId);

    return {
      ...car,
      brand: (carBrand && carBrand.title) ?? 'unknown',
      model: (carModel && carModel.title) ?? 'unknown',
    };
  };

  public deleteCarById = (carId: string): void => {
    this.props.cars = this.props.cars.filter((car) => car.id !== carId);
  };

  public getByBrandId = (brandId: string): CarJoined[] => {
    const brandModelsIds = this.props.models
      .filter((model) => model.brandId === brandId)
      .map((model) => model.id);

    const joindCars = this.props.cars
      .filter((car) => brandModelsIds.includes(car.modelId))
      .map(this.joinCar);

      return joindCars;
  };

  public getCarById = (brandId: string): Brand => {
    const brand = this.props.brands.find(({ id }) => id === brandId);

    if (brand === undefined) {
      throw new Error(`Brand with ID '${brandId}' was not found`);
    }

    return brand;
  };

  public add = ({ modelId, brandId, ...carProps }: CarProps): void => {
    const model = this.props.models.find((m) => m.id === modelId);
    const brand = this.props.brands.find((b) => b.id === brandId);

    if (!model || !brand) {
      throw new Error('Wrong data for car creation');
    }

    const newCar: Car = {
      id: createId(),
      ...carProps,
      modelId,
    };

    this.props.cars.push(newCar);
  };
}

export default CarsCollection;
