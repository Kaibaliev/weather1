// import React, {Component} from 'react';
// import './App.css';
// import Form from '../form';
// import Weather from '../weather';
// import Spinner from '../spinner'
// import ErrorIndicator from "../error-indicator";


const APIbase = 'http://api.openweathermap.org/data/2.5/forecast?q=';
const APIid = '&APPID=9e8065e34a6257f2541615c08b855863';


export default class App extends Component {

    state = {
        // body: {},
        city: '',
        // country: null,
        // weather: {},
        // main:{},
        // clouds:{},
        // wind:{},
        // dt_txt:{},
        error: true,
        loader: true

    };

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        console.log(city);
        try {
            fetch(`${APIbase}${city}${APIid}&units=metric`)

                .then((response) => {
                    return response.json();
                })
                .then((body) => {
                    this.setState({
                        city: body.city.name,
                        country: body.city.country,
                        weather: body.list[1],
                    });
                    const {all} = this.state.weather.clouds;
                    this.setState({all});
                    const {humidity} = this.state.weather.main;
                    this.setState({humidity});
                    const {speed} = this.state.weather.wind;
                    this.setState({speed});
                    const {temp} = this.state.weather.main;
                    let newTemp = temp.toFixed(2);
                    this.setState({newTemp});
                    const {dt_txt} = this.state.weather;
                    this.setState({dt_txt});
                    const {icon} = this.state.weather.weather[0];
                    this.setState({icon});


                    console.log(this.state.weather);

                })
        } catch (error) {
            return this.onError
        }
    };
    onError = () => {
        this.setState({
            error: false,
            loader: false
        })
    };

    render() {
        const {error, loader} = this.state;
        const hasData = !(loader || error);
        const spinner = loader ? <Spinner/> : null;
        const content = hasData ? <WeatherViev/> : null;
        const errorMessege = error ? <ErrorIndicator/> : null;


        return (
            <div>
                {spinner}
                {content}
                {errorMessege}
            </div>

        )
    };
}


const WeatherViev = () => {
    return (
        <React.Fragment>
            <div className='widget'>
                <h3>The weather forecast </h3>
                <div className=''>
                    <Form Weather={this.getWeather}/>
                </div>
                <div>
                    <Weather
                        city={this.state.city}
                        country={this.state.country}
                        date={this.state.dt_txt}
                        clouds={this.state.all}
                        windSpeed={this.state.speed}
                        humidity={this.state.humidity}
                        temp={this.state.newTemp}
                        icon={this.state.icon}
                    />
                </div>
            </div>
        </React.Fragment>)

};