export type TableRowData = {
  id: string,
  [key: string]: string,
};

export type TableProps<Type extends TableRowData> = {
  title: string,
  columns: Type,
  rowsData: Type[],
  editedCarId: string | null,
  onDelete: (id: string) => void,
  onEdit: (id: string) => void,
};

class Table<T extends TableRowData> {
  public htmlElement: HTMLTableElement;

  private props: TableProps<T>;

  private tbody: HTMLTableSectionElement;

  private thead: HTMLTableSectionElement;

  constructor(props: TableProps<T>) {
    this.props = props;
    this.htmlElement = document.createElement('table');
    this.tbody = document.createElement('tbody');
    this.thead = document.createElement('thead');

    this.initialize();
    this.renderView();
  }

  public initialize = () => {
    this.htmlElement.className = 'table table-striped';
    this.htmlElement.append(
      this.thead,
      this.tbody,
    );
  };

  private renderHeadView = () => {
    const columnsNames = Object.values(this.props.columns);
    const columnsHtmlStr = `${columnsNames
      .map((name) => `<th>${name}</th>`)
      .join('')}<th></th>`;
    this.thead.innerHTML = `
    <tr class="text-center h4 table-dark">
      <th colspan="${columnsNames.length + 1}">${this.props.title}</th>
    </tr>
    <tr>${columnsHtmlStr}</tr>`;
  };

  private renderBodyView = () => {
    this.tbody.innerHTML = '';
    const keys = Object.keys(this.props.columns);

    this.props.rowsData.forEach((rowData) => {
      const tr = document.createElement('tr');
      tr.innerHTML = keys
      .map((key) => `<td>${rowData[key]}</td>`)
      .join('');

      const rowIsBeingEdited = this.props.editedCarId === rowData.id;
      if (rowIsBeingEdited) {
        tr.style.backgroundColor = '#fff2cf';
      }

      const updBtn = document.createElement('button');
      updBtn.style.width = '37.23px';
      updBtn.className = `btn btn-${rowIsBeingEdited ? 'secondary' : 'warning'} btn-sm`;
      updBtn.innerText = `${rowIsBeingEdited ? '🗙' : '✎'}`;
      updBtn.addEventListener('click', () => {
        this.props.onEdit(rowData.id);
      });

      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-danger btn-sm';
      delBtn.innerText = '🗑';
      delBtn.addEventListener('click', () => {
        this.props.onDelete(rowData.id);
      });

      const btnContainer = document.createElement('div');
      btnContainer.className = 'd-flex gap-2';

      btnContainer.append(updBtn, delBtn);

      const lastTd = document.createElement('td');
        lastTd.append(btnContainer);
        tr.append(lastTd);
        this.tbody.append(tr);
      });
  };

  public renderView = () => {
    this.renderHeadView();
    this.renderBodyView();
  };

  public updateProps = (newProps: Partial<TableProps<T>>) => {
    this.props = {
      ...this.props,
      ...newProps,
    };
    this.renderView();
  };
}

export default Table;
