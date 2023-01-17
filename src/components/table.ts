type TableRowData = {
  id: string,
  [key: string]: string,
};

type TableProps<Type extends TableRowData> = {
  title: string,
  columns: Type,
  rowsData: Type[],
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
  }

  public initializeHead = () => {
    const columnsNames = Object.values(this.props.columns);
    const columnsHtmlStr = columnsNames
      .map((name) => `<th>${name}</th>`)
      .join('');
    this.thead.innerHTML = `
    <tr class="text-center h4 table-dark">
      <th colspan="${columnsNames.length}">${this.props.title}</th>
    </tr>
    <tr>${columnsHtmlStr}</tr>`;
  };

  public initializeBody = () => {
    const keys = Object.keys(this.props.columns);
    this.props.rowsData.forEach((rowData) => {
      const columnsHtmlStr = keys
        .map((key) => `<td>${rowData[key]}</td>`)
        .join('');

      this.tbody.innerHTML += `<tr>${columnsHtmlStr}</tr>`;
    });
  };

  public initialize = () => {
    this.initializeHead();
    this.initializeBody();
    this.htmlElement.className = 'table table-striped table-secondary';
    this.htmlElement.append(
      this.thead,
      this.tbody,
    );
  };
}

export default Table;
