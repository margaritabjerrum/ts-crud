import FormSelectField from './form-select-field';
import TextField from './text-field';

class CarForm {
  public htmlElement: HTMLFormElement;

  private formTitleHtmlElement: HTMLHeadingElement;

  private submitBtn: HTMLButtonElement;

  constructor() {
    this.htmlElement = document.createElement('form');
    this.formTitleHtmlElement = document.createElement('h2');
    this.submitBtn = document.createElement('button');

    this.initialize();
    this.renderView();
  }

  private initialize = () => {
    this.formTitleHtmlElement.className = 'h3 text-center';
    this.formTitleHtmlElement.innerText = 'Add New Car';

    this.submitBtn.className = 'btn btn-primary';
    this.submitBtn.innerText = 'Add';
    this.submitBtn.setAttribute('type', 'submit');

    this.htmlElement.className = 'card d-flex flex-column gap-3 p-3';
    this.htmlElement.style.width = '450px';
  };

  private renderView = () => {
    const brandSelectField = new FormSelectField({
      labelText: 'Brand',
      name: 'brand',
      options: [
        { label: 'AAA', value: '1' },
        { label: 'BMW', value: '2' },
        { label: 'Subaru', value: '3' },
      ],
    });

    const modelSelectField = new FormSelectField({
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
    });

    const priceTextField = new TextField({
      labelText: 'Price',
      name: 'price',
    });

    const yearTextField = new TextField({
      labelText: 'Year',
      name: 'year',
    });

    this.htmlElement.append(
      this.formTitleHtmlElement,
      brandSelectField.htmlElement,
      modelSelectField.htmlElement,
      priceTextField.htmlElement,
      yearTextField.htmlElement,
      this.submitBtn,
    );
  };
}

export default CarForm;
