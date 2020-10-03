import React, { Component } from "react";
import Throbber from "common/ui/Throbber";
import { getCityWeather } from "services/weatherStackApi";
import styles from "./GeoLocation.module.css";

class GeoLocationAwareRedirector extends Component {
  constructor(props) {
    super(props);
    this.state = { gotPositionResponse: false };
  }
  geoSuccess = async (position) => {
    const { history } = this.props;
    this.setState({ gotPositionResponse: true });
    const query = `${position.coords.latitude},${position.coords.longitude}`;
    const { name, country } = await getCityWeather(query);
    history.push(`/detail/${name}/${country}`);
  };
  geoError = () => {
    const { history } = this.props;
    history.push("/list");
  };
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      this.geoError();
    }
  }
  render() {
    const { gotPositionResponse } = this.state;
    if (!gotPositionResponse) {
      return (
        <div className={styles.permissionPrompt}>
          Please allow location permission to view weather details in your city.
        </div>
      );
    }
    return <Throbber />;
  }
}

export default GeoLocationAwareRedirector;
