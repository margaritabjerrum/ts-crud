import FormSelectField from './form-select-field';
import TextField from './text-field';

export type Values = {
  brand: string,
  model: string,
  price: string,
  year: string,
};

type CarFormProps = {
  values: Values,
  title: string,
  submitBtnText: string,
  onSubmit: (values: Values) => void,
};

class CarForm {
  private brandSelectField: FormSelectField;

  private modelSelectField: FormSelectField;

  private priceTextField: TextField;

  private yearTextField: TextField;

  private props: CarFormProps;

  private formTitleHtmlElement: HTMLHeadingElement;

  private submitBtn: HTMLButtonElement;

  public htmlElement: HTMLFormElement;

  constructor(props: CarFormProps) {
    this.props = props;

    this.htmlElement = document.createElement('form');
    this.formTitleHtmlElement = document.createElement('h2');
    this.submitBtn = document.createElement('button');

    this.brandSelectField = new FormSelectField({
      labelText: 'Brand',
      name: 'brand',
      options: [
        { label: 'AAA', value: '1' },
        { label: 'BMW', value: '2' },
        { label: 'Subaru', value: '3' },
      ],
      initialValue: props.values.brand,
    });

    this.modelSelectField = new FormSelectField({
      labelText: 'Model',
      name: 'model',
      options: [
        { label: 'AAA', value: '1' },
        { label: 'Astra', value: '2' },
        { label: 'Insignia', value: '3' },
        { label: 'X1', value: '4' },
        { label: 'X2', value: '5' },
        { label: 'X3', value: '6' },
        { label: 'Impreza', value: '7' },
        { label: 'Forester', value: '8' },
        { label: 'Ascent', value: '9' },
      ],
      initialValue: props.values.model,
    });

    this.priceTextField = new TextField({
      labelText: 'Price',
      name: 'price',
      initialValue: String(props.values.price),
    });

    this.yearTextField = new TextField({
      labelText: 'Year',
      name: 'year',
      initialValue: String(props.values.year),
    });

    this.initialize();
    this.renderView();
  }

  private handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const formData = new FormData(this.htmlElement);

    const brand = formData.get('brand') as string | null;
    const model = formData.get('model') as string | null;
    const price = formData.get('price') as string | null;
    const year = formData.get('year') as string | null;

    if (!(brand && price && model && year)) {
      throw new Error('Bad Form Data');
    }

    const formValues: Values = {
      brand,
      model,
      price,
      year,
    };

    this.props.onSubmit(formValues);
  };

  private initialize = () => {
    this.formTitleHtmlElement.className = 'h3 text-center';

    this.submitBtn.className = 'btn btn-primary';
    this.submitBtn.setAttribute('type', 'submit');

    this.htmlElement.className = 'card d-flex flex-column gap-3 p-3';
    this.htmlElement.style.width = '450px';

    this.htmlElement.append(
      this.formTitleHtmlElement,
      this.brandSelectField.htmlElement,
      this.modelSelectField.htmlElement,
      this.priceTextField.htmlElement,
      this.yearTextField.htmlElement,
      this.submitBtn,
    );

    this.htmlElement.addEventListener('submit', this.handleSubmit);
  };

  private renderView = () => {
    const {
      values: {
        brand,
        model,
        price,
        year,
      },
     } = this.props;

    this.formTitleHtmlElement.innerText = this.props.title;
    this.submitBtn.innerText = this.props.submitBtnText;

    this.brandSelectField.updateProps({ initialValue: brand });
    this.modelSelectField.updateProps({ initialValue: model });
    this.priceTextField.updateProps({ initialValue: String(price) });
    this.yearTextField.updateProps({ initialValue: String(year) });
  };

  public updateProps = (newProps: Partial<CarFormProps>) => {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.renderView();
  };
}

export default CarForm;
