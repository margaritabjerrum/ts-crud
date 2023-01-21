export type Option = {
  label: string,
  value: string,
};

type FormSelectFieldProps = {
  labelText: string,
  name: string,
  options: Option[],
  initialValue?: string;
};

class FormSelectField {
  private static count = 0;

  private id: string;

  private props: FormSelectFieldProps;

  public htmlElement: HTMLDivElement;

  constructor(props: FormSelectFieldProps) {
    FormSelectField.count += 1;
    this.id = `${FormSelectField.name}_${FormSelectField.count}`;
    this.props = props;
    this.htmlElement = document.createElement('div');

    this.renderView();
  }

  public renderView = () => {
    const optionsHtml = this.props.options
      .map(({ label, value }) => `
      <option value="${value}" 
      ${this.props.initialValue === value ? 'selected' : ''}>
      ${label}
      </option>`)
      .join('');

    this.htmlElement.className = 'form-group';

    this.htmlElement.innerHTML = `
      <label for="select-${this.id}">${this.props.labelText}</label>
      <select 
        class="form-select" 
        id="${this.id}" 
        name="${this.props.name}" 
        ${optionsHtml}`;
  };

  public updateProps = (newProps: Partial<FormSelectFieldProps>) => {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.renderView();
  };
}

export default FormSelectField;
