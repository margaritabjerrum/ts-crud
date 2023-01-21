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

  public update = (carId: string, { brandId, modelId, ...props }: CarProps) => {
    const { cars, models, brands } = this.props;

    const updatedCarIndex = cars.findIndex((c) => c.id === carId);
    if (updatedCarIndex === -1) {
      throw new Error(`Car with id '${carId}' was not found`);
    }

    const model = models.find((m) => m.id === modelId);
    if (!model) {
      throw new Error(`Car with id '${modelId}' was not found`);
    }

    const brand = brands.find((b) => b.id === brandId);
    if (!brand) {
      throw new Error(`Car with id '${brandId}' was not found`);
    }

    const updatedCar: Car = {
      ...cars[updatedCarIndex],
      ...props,
      modelId,
    };

    this.props.cars.splice(updatedCarIndex, 1, updatedCar);
  };
}

export default CarsCollection;
