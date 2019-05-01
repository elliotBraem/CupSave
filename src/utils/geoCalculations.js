// helper functions (degrees<–>radians)
const degToRad = number => {
  return number * (Math.PI / 180);
};

const radToDeg = number => {
  return (180 * number) / Math.PI;
};

export const getGeometricBoundingBox = (latitude, longitude, distance) => {
  // coordinate limits
  const MIN_LATITUDE = degToRad(-90);
  const MAX_LATITUDE = degToRad(90);
  const MIN_LONGITUDE = degToRad(-180);
  const MAX_LONGITUDE = degToRad(180);
  const EARTH_RADIUS = 6378.0211; // Earth's radius (km)

  const radDistance = distance / EARTH_RADIUS;

  // center point coordinates (rad)
  const radLat = degToRad(latitude);
  const radLon = degToRad(longitude);

  // minimum and maximum latitudes for given distance
  let minLat = radLat - radDistance;
  let maxLat = radLat + radDistance;
  let minLon;
  let maxLon;

  // define deltaLon to help determine min and max longitudes
  const deltaLon = Math.asin(Math.sin(radDistance) / Math.cos(radLat));
  if (minLat > MIN_LATITUDE && maxLat < MAX_LATITUDE) {
    minLon = radLon - deltaLon;
    maxLon = radLon + deltaLon;

    if (minLon < MIN_LONGITUDE) {
      minLon += 2 * Math.PI;
    }

    if (maxLon > MAX_LONGITUDE) {
      maxLon -= 2 * Math.PI;
    }
  } else {
    // a pole is within the given distance
    minLat = Math.max(minLat, MIN_LATITUDE);
    maxLat = Math.min(maxLat, MAX_LATITUDE);
    minLon = MIN_LONGITUDE;
    maxLon = MAX_LONGITUDE;
  }

  return {
    latitudeMin: radToDeg(minLat),
    longitudeMin: radToDeg(minLon),
    latitudeMax: radToDeg(maxLat),
    longitudeMax: radToDeg(maxLon),
  };
};
