import React, { useState } from 'react';

const ConversionForm = ({ onClose }) => {
  const [latDMS, setLatDMS] = useState('');
  const [lonDMS, setLonDMS] = useState('');
  const [conversionType, setConversionType] = useState('DD to DMS');
  const [resultLat, setResultLat] = useState('');
  const [resultLon, setResultLon] = useState('');

  const handleConversion = () => {
    if (conversionType === 'DD to DMS') {
      convertDDtoDMS();
    } else {
      convertDMStoDD();
    }
  };

  const convertDDtoDMS = () => {
    const ddLat = parseFloat(latDMS);
    const ddLon = parseFloat(lonDMS);

    setResultLat(convertToDMS(ddLat, 'N', 'S'));
    setResultLon(convertToDMS(ddLon, 'E', 'W'));
  };

  const convertDMStoDD = () => {
    const dmsLatArray = latDMS.match(/[+-]?\d+(\.\d+)?/g);
    const dmsLonArray = lonDMS.match(/[+-]?\d+(\.\d+)?/g);

    if (isValidDMSArray(dmsLatArray) && isValidDMSArray(dmsLonArray)) {
      setResultLat(convertToDD(dmsLatArray));
      setResultLon(convertToDD(dmsLonArray));
    } else {
      setResultLat('Invalid input');
      setResultLon('Invalid input');
    }
  };

  const isValidDMSArray = (array) => array && array.length === 3;

  const convertToDD = (dmsArray) => {
    const [degrees, minutes, seconds] = dmsArray.map(parseFloat);
    const dd = degrees + minutes / 60 + seconds / 3600;

    return dd.toFixed(6) + '°';
  };

  const convertToDMS = (dd, positiveDirection, negativeDirection) => {
    const absoluteDD = Math.abs(dd);
    const degrees = Math.floor(absoluteDD);
    const minutes = Math.floor((absoluteDD - degrees) * 60);
    const seconds = ((absoluteDD - degrees - minutes / 60) * 3600).toFixed(2);

    return `${degrees}°${minutes}'${seconds}" ${dd >= 0 ? positiveDirection : negativeDirection}`;
  };

  const handleClear = () => {
    setLatDMS('');
    setLonDMS('');
    setConversionType('DD to DMS');
    setResultLat('');
    setResultLon('');
  };

  return (
    <div className="conversion-form">
      <label>Latitude</label>
      <input type="text" value={latDMS} onChange={(e) => setLatDMS(e.target.value)} />

      <label>Longitude</label>
      <input type="text" value={lonDMS} onChange={(e) => setLonDMS(e.target.value)} />

      <div>
        <label>Conversion Type</label>
        <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
          <option value="DD to DMS">DD to DMS</option>
          <option value="DMS to DD">DMS to DD</option>
        </select>
      </div>

      <div className="buttons">
        <button onClick={handleConversion}>Convert</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={onClose}>Close</button>
      </div>

      <div className="result">
        <label>Result</label>
        <div>
          <span>Latitude: {resultLat}</span>
        </div>
        <div>
          <span>Longitude: {resultLon}</span>
        </div>
      </div>
      <button className="add-to-map-button" >Add to Map</button>
    </div>
  );
};

export default ConversionForm;
