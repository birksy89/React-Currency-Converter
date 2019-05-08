import React from 'react';
import image from '../images/cash-calculator.svg';
import data from './data/Data';

class App extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
      activeCurrencyCode: 'USD',
      inputLeft: 0,
      inputRight: 0,
    };
  }

  componentDidMount() {
    const { currencies } = data;
    this.setState({
      currencies,
    });
  }

  handleSelectChange = e => {
    const newCode = e.target.value;
    const activeCurrency = this.getCurrencyFromCode(newCode);

    this.setState({
      activeCurrencyCode: activeCurrency.code,
    });
  };

  handleInputChange = e => {
    const { activeCurrencyCode } = this.state;
    const {
      target: { value },
    } = e;

    const activeCurrency = this.getCurrencyFromCode(activeCurrencyCode);

    const rightVal = value * activeCurrency.sellRate;

    this.setState({
      inputLeft: value,
      inputRight: rightVal,
    });
  };

  getCurrencyFromCode = code => {
    const { currencies } = this.state;

    const [activeCurrency] = currencies.filter(
      currency => currency.code === code
    );

    return activeCurrency;
  };

  render() {
    const {
      currencies,
      activeCurrencyCode,
      inputLeft,
      inputRight,
    } = this.state;
    const activeCurrency = this.getCurrencyFromCode(activeCurrencyCode);

    if (activeCurrency) {
      return (
        <div>
          <header>
            <img src={image} alt="" />
            <h1>Currency Converter</h1>
          </header>
          <div className="content">
            <div className="row row-select-currency">
              <div className="col-md-6 col-md-offset-3">
                <h2>Select Currency</h2>
                <p>
                  {
                    // Select currency
                  }
                  <select
                    value={activeCurrencyCode}
                    onChange={e => this.handleSelectChange(e)}
                  >
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name}
                      </option>
                    ))}
                  </select>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 currency-from-input">
                <h3 className="currency-flag AUD">Australian Dollars</h3>
                {
                  // Currency A input
                }
                <div className="input-group">
                  <span className="input-group-addon">$</span>
                  <input
                    type="number"
                    defaultValue={0}
                    value={inputLeft}
                    className="form-control"
                    aria-describedby="basic-addon2"
                    step="1"
                    pattern="\d\.\d{2}"
                    onChange={e => this.handleInputChange(e)}
                  />
                  <span className="input-group-addon" id="basic-addon2">
                    AUD
                  </span>
                </div>
              </div>
              <div className="col-sm-6 currency-to-input">
                <h3 className={`currency-flag ${activeCurrency.code}`}>
                  {activeCurrency.name}
                </h3>
                {
                  // Currency B input
                }
                <div className="input-group">
                  <span className="input-group-addon">
                    {activeCurrency.sign}
                  </span>
                  <input
                    type="number"
                    defaultValue={0}
                    value={inputRight}
                    className="form-control"
                    aria-describedby="basic-addon3"
                    step="1"
                    pattern="\d\.\d{2}"
                  />
                  <span className="input-group-addon" id="basic-addon3">
                    {activeCurrency.code}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {
                  // Update to currently selected currency
                }
                <p>
                  Exchange Rate $ 1 AUD ={' '}
                  {`${activeCurrency.sign} ${activeCurrency.sellRate} ${
                    activeCurrency.code
                  }`}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <p>Loading...</p>;
  }
}

export default App;
