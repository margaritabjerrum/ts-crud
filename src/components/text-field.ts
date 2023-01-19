type TextFieldProps = {
  labelText: string,
  name: string,
  initialValue?: string;
};

class TextField {
  private static count = 0;

  private id: string;

  private props: TextFieldProps;

  public htmlElement: HTMLDivElement;

  constructor(props: TextFieldProps) {
    TextField.count += 1;
    this.id = `${TextField.name}_${TextField.count}`;
    this.props = props;
    this.htmlElement = document.createElement('div');

    this.renderView();
  }

  public renderView = () => {
    this.htmlElement.innerHTML = `
        <label for="${this.id}" class="form-label">${this.props.labelText}</label>
        <input 
          id="${this.id}"
          class="form-control" 
          type="text" 
          name="${this.props.name}"
          value="${this.props.initialValue ?? ''}"
        >`;
  };

  public updateProps = (newProps: Partial<TextFieldProps>) => {
    this.props = {
      ...this.props,
      ...newProps,
    };

    this.renderView();
  };
}

export default TextField;
