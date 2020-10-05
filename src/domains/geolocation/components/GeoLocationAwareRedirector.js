import React, { Component } from "react";
import { connect } from "react-redux";
import Throbber from "common/ui/Throbber";
import { getCityWeather } from "services/weatherStackApi";
import { setCityWeatherDetailsAction } from "domains/weatherdetail/store/cityWeatherDetailPageActions";
import styles from "./GeoLocation.module.css";

class GeoLocationAwareRedirector extends Component {
  constructor(props) {
    super(props);
    this.state = { gotPositionResponse: true };
  }
  geoSuccess = async (position) => {
    const { history } = this.props;
    this.setState({ gotPositionResponse: true });
    const query = `${position.coords.latitude},${position.coords.longitude}`;
    const city = await getCityWeather(query);
    this.props.dispatch(setCityWeatherDetailsAction(city));
    history.push(
      `/detail?cityId=${city.id}&cityName=${city.name}&region=${city.region}&country=${city.country}`
    );
  };
  geoError = () => {
    const { history } = this.props;
    history.push("/list");
  };
  onChangePermissionState = (state) => {
    if (state === "prompt") {
      this.setState({ gotPositionResponse: false });
    } else {
      this.setState({ gotPositionResponse: true });
    }
  };
  findGeoLocation = async () => {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({
          name: "geolocation",
        });
        this.onChangePermissionState(permissionStatus.state);
        permissionStatus.addEventListener(
          "change",
          this.onChangePermissionState
        );
      }
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    } else {
      this.geoError();
    }
  };
  componentDidMount() {
    this.findGeoLocation();
  }
  render() {
    const { gotPositionResponse } = this.state;
    if (!gotPositionResponse) {
      return (
        <div className={styles.permissionPrompt}>
          <p>
            Please allow location permission to view weather details in your
            city.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.permissionPrompt}>
        <div className={styles.loader}>
          <Throbber />
        </div>
        <p className={styles.loaderMsg}>Searching for current location..</p>
      </div>
    );
  }
}

export default connect()(GeoLocationAwareRedirector);
