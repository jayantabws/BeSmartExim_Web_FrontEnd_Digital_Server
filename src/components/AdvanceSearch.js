import React, { useState, useRef, useCallback, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from "react-select/creatable";
import { MultiSelect } from "react-multi-select-component";
import Swal from 'sweetalert2';

const AdvanceSearch = (props) => {
  console.log("props.exporterForImport === ", props.exporterForImport)
  console.log("props.importerForExport === ", props.importerForExport)

  const [portOriginList, setPortOriginList] = useState([]);
  const [selectedPol, setSelectedPol] = useState([]);
  const [portDestinationList, setPortDestinationList] = useState([]);
  const [selectedPdl, setSelectedPdl] = useState([]);
  const [hsCodeList, setHsCodeList] = useState([]);
  const [selectedHsCode, setSelectedHsCode] = useState([]);
  const [importerList, setImporterList] = useState([]);
  const [selectedImporter, setSelectedImporter] = useState([]);
  const [exporterList, setExporterList] = useState([]);
  const [selectedExporter, setSelectedExporter] = useState([]);
  const [cityOriginList, setCityOriginList] = useState([]);
  const [selectedCityOrigin, setSelectedCityOrigin] = useState([]);
  const [cityDestinationList, setCityDestinationList] = useState([]);
  const [selectedCityDestination, setSelectedCityDestination] = useState([]);
  const [hsCode4DigitList, setHsCode4digitList] = useState([]);
  const [selectedHsCode4Disgit, setSelectedHsCode4Digit] = useState([]);
  const [shipmentModeList, setShipmentModeList] = useState([]);
  const [selectedShipmentMode, setSelectedShipmentMode] = useState([]);
  const [stdUnitList, setStdUnitList] = useState([]);
  const [selectedStdUnit, setSelectedStdUnit] = useState([]);
  const [minQuantity, setMinQuantity] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setmaxValue] = useState('');
  const [minUnitPrice, setMinUnitPrice] = useState('');
  const [maxUnitPrice, setMaxUnitPrice] = useState('');
  const [consumptionTypeList, setConsumptionTypeList] = useState([]);
  const [selectedConsumptionType, setSelectedConsumptionType] = useState([]);

  const [incotermList, setIncotermList] = useState([]);
  const [selectedIncotermList, setSelectedIncotermList] = useState([]);

  const [notifyPartyList, setNotifyPartyList] = useState([]);
  const [selectedNotifyPartyList, setSelectedNotifyPartyList] = useState([]);
  const [descriptionList, setDescriptionList] = useState([]);
  const [conditionProductDescription, setConditionProductDescription] = useState("C");

  const handleSubmit = () => {
    const data = {
      portOriginList,
      portDestinationList,
      hsCodeList,
      importerList,
      exporterList,
      cityOriginList,
      cityDestinationList,
      hsCode4DigitList,
      shipmentModeList,
      stdUnitList,
      minQuantity,
      maxQuantity,
      minValue,
      maxValue,
      minUnitPrice,
      maxUnitPrice,
      consumptionTypeList,
      incotermList,
      notifyPartyList,
      conditionProductDescription,
      descriptionList
    };
    if (portOriginList.length == 0 && portDestinationList.length == 0 && hsCodeList.length == 0 && importerList.length == 0
      && exporterList.length == 0 && cityOriginList.length == 0 && cityDestinationList.length == 0 && hsCode4DigitList.length == 0
      && shipmentModeList.length == 0 && stdUnitList.length == 0 && minQuantity == "" && maxQuantity == "" && minValue == "" && maxValue == ""
      && minUnitPrice == "" && maxUnitPrice == "" && consumptionTypeList.length == 0 && incotermList.length == 0 && notifyPartyList.length == 0
      && descriptionList.length == 0) {

      Swal.fire({
        title: 'Select !',
        text: 'Select atleast one filter or reset filter',
        icon: 'error',
        dangerMode: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      })
    }
    else {
      props.updateFilter(data);
    }

  }

  const resetAdvaceFilter = () => {
    const data = {
      portOriginList: [],
      portDestinationList: [],
      hsCodeList: [],
      importerList: [],
      exporterList: [],
      cityOriginList: [],
      cityDestinationList: [],
      hsCode4DigitList: [],
      shipmentModeList: [],
      stdUnitList: [],
      minQuantity: "",
      maxQuantity: "",
      minValue: "",
      maxValue: "",
      minUnitPrice: "",
      maxUnitPrice: "",
      consumptionTypeList: [],
      incotermList: [],
      notifyPartyList: [],
      descriptionList: [],
      returnSearchId: props.searchId
    };
    // props.updateFilter(data);
    props.resetFilter(data);

  }

  useEffect(() => {
    console.log(props)
    updatePOL();
    UpdatePDL();
    updateHSCodes();
    update4digitHSCodes();
    updateImporters();
    updateExporters();
    updateCityList();
    updateCountryList();
    updateShipmentMode();
    updateUnits();
    updateConsumptionType();
    updateIncoterm();
    updateNotifyPartyList();
  }, [])

  let defaultPOL = () => {
    let pol = [{
      label: "",
      value: ""
    }]
    props.portOriginList.forEach(item => {
      pol.push({ value: item, label: item });
    });
    console.log("POL default value >>> ", pol)
    return pol;
  }

  const updatePOL = () => {
    let pol = [],
      selectedItem = [];

    props.portOriginList.forEach(item => {
      pol.push(item);
      selectedItem.push({ value: item, label: item });
    });
    console.log("Selected Port origin list >>> ", selectedItem)
    setPortOriginList(pol);
    setSelectedPol(selectedItem);
  }

  let defaultPDL = () => {
    let pdl = []
    props.portDestinationList.forEach(item => {
      pdl.push({ value: item, label: item });
    });
    return pdl;
  }

  const UpdatePDL = () => {
    let pdl = [],
      selectedItem = [];
    props.portDestinationList.forEach(item => {
      pdl.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setPortDestinationList(pdl);
    setSelectedPdl(selectedItem);
  }

  let defaultHSCodes = () => {
    let hsCodes = []
    props.hsCodeList.forEach(item => {
      hsCodes.push({ value: item, label: item });
    });
    return hsCodes;
  }

  const updateHSCodes = () => {
    let hsCodes = [],
      selectedItem = [];
    props.hsCodeList.forEach(item => {
      hsCodes.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setHsCodeList(hsCodes);
    setSelectedHsCode(selectedItem);
  }

  let default4digitHSCodes = () => {
    let hsCodes4Digits = []
    props.hsCode4DigitList.forEach(item => {
      hsCodes4Digits.push({ value: item, label: item });
    });
    return hsCodes4Digits;
  }

  const update4digitHSCodes = () => {
    let hsCodes4Digits = [],
      selectedItem = [];
    props.hsCode4DigitList.forEach(item => {
      hsCodes4Digits.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setHsCode4digitList(hsCodes4Digits);
    setSelectedHsCode4Digit(selectedItem);
  }

  let defaultImporters = () => {
    let importers = []
    props.importerList.forEach(item => {
      importers.push({ value: item, label: item });
    });
    return importers;
  }

  const updateImporters = () => {
    let importers = [],
      selectedItem = [];
    props.importerList.forEach(item => {
      importers.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setImporterList(importers);
    setSelectedImporter(selectedItem);
  }

  let defaultExporters = () => {
    let exporters = []
    props.exporterList.forEach(item => {
      exporters.push({ value: item, label: item });
    });
    return exporters;
  }

  const updateExporters = () => {
    let exporters = [],
      selectedItem = [];
    props.exporterList.forEach(item => {
      exporters.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setExporterList(exporters);
    setSelectedExporter(selectedItem);
  }

  let defaultCityList = () => {
    let cityList = []
    props.cityOriginList.forEach(item => {
      cityList.push({ value: item, label: item });
    });
    return cityList;
  }

  const updateCityList = () => {
    let cityList = [],
      selectedItem = [];
    props.cityOriginList.forEach(item => {
      cityList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setCityOriginList(cityList);
    setSelectedCityOrigin(selectedItem);
  }


  let defaultCountryList = () => {
    let CityDestinationList = []
    props.cityDestinationList.forEach(item => {
      CityDestinationList.push({ value: item, label: item });
    });
    return CityDestinationList;
  }

  const updateCountryList = () => {
    let CityDestinationList = [],
      selectedItem = [];
    props.cityDestinationList.forEach(item => {
      CityDestinationList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setCityDestinationList(CityDestinationList);
    setSelectedCityDestination(selectedItem);
  }

  let defaultShipmentMode = () => {
    let ShipmentModeLst = []
    props.shipmentModeList.forEach(item => {
      ShipmentModeLst.push({ value: item, label: item });
    });
    return ShipmentModeLst;
  }

  const updateShipmentMode = () => {
    let ShipmentModeLst = [],
      selectedItem = [];
    props.shipmentModeList.forEach(item => {
      ShipmentModeLst.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setShipmentModeList(ShipmentModeLst);
    setSelectedShipmentMode(selectedItem);
  }

  let defaultUnits = () => {
    let StdUnitList = []
    props.stdUnitList.forEach(item => {
      StdUnitList.push({ value: item, label: item });
    });
    return StdUnitList;
  }

  const updateUnits = () => {
    let StdUnitList = [],
      selectedItem = [];
    props.stdUnitList.forEach(item => {
      StdUnitList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setStdUnitList(StdUnitList);
    setSelectedStdUnit(selectedItem);
  }

  const handleMinQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMinQuantity(value);
    }
  };

  const handleMaxQuantityChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMaxQuantity(value);
    }
  };



  const updateConsumptionType = () => {
    let mainList = [],
      selectedItem = [];
    props.consumptionType.forEach(item => {
      mainList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setConsumptionTypeList(mainList);
    setSelectedConsumptionType(selectedItem);
  }

  const updateIncoterm = () => {
    console.log("update Incoterm >>>>> ", props.incotermList);
    let mainList = [],
      selectedItem = [];
    props.incotermList.forEach(item => {
      mainList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setIncotermList(mainList);
    setSelectedIncotermList(selectedItem);
  }

  const updateNotifyPartyList = () => {
    let mainList = [],
      selectedItem = [];
    props.notifyPartyList.forEach(item => {
      mainList.push(item);
      selectedItem.push({ value: item, label: item });
    });
    setNotifyPartyList(mainList);
    setSelectedNotifyPartyList(selectedItem);
  }

  const handleMinValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMinValue(value);
    }
  };

  const handleMaxValueChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setmaxValue(value);
    }
  };

  const handleMinUnitPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMinUnitPrice(value);
    }
  };

  const handleMaxUnitPriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setMaxUnitPrice(value);
    }
  };

  const handleChangeData = (selectedValues) => {

    console.log("selectedValues >>>>> ", selectedValues)
  };
  const customSingleValue = ({ data }) => (
    <div>
      <input type="checkbox" checked readOnly /> {data.label}
    </div>
  );
  return (
    <div className="advance-search">
      <button className="btn btn-link cl-butt" onClick={() => props.toggleFromChild(false)}><i className="icon ion-md-close-circle-outline font-size-24"></i></button>
      <form className="hero__form v3 filter listing-filter">
        <h4>Advance Search</h4>
        {props.countryDestinationList.length > 0 || props.countryOriginList.length > 0 ||
          props.importerDataList.length > 0 || props.exporterDataList.length > 0 ||
          props.hsCodeDataList.length > 0 || props.hsCode4digitDataList.length > 0 ||
          props.portDestinationDataList.length > 0 || props.portOriginDataList.length > 0 ||
          props.shipmentModeDataList.length > 0 || props.stdUnitDataList.length > 0 ?

          <div className="row ad-mid mb-3">
            {props.type === "IMPORT" && props.portDestinationDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Port Of Origin</label>
                  {/* <Select
                    defaultValue={defaultPOL}
                    isMulti
                    name="colors"
                    options={props.type === "IMPORT" ? props.portDestinationDataList : props.portOriginDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortOriginList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    classNamePrefix="select"
                    closeMenuOnSelect={false}
                    components={{ SingleValue: customSingleValue }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.portDestinationDataList : props.portOriginDataList}
                    value={selectedPol}
                    onChange={(selectedOption) => {
                      setSelectedPol(selectedOption)
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortOriginList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.type === "EXPORT" && props.portOriginDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Port Of Origin</label>
                  {/* <Select
                    defaultValue={defaultPOL}
                    isMulti
                    name="colors"
                    options={props.type === "IMPORT" ? props.portDestinationDataList : props.portOriginDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortOriginList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    classNamePrefix="select"
                    components={{ SingleValue: customSingleValue }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.portDestinationDataList : props.portOriginDataList}
                    value={selectedPol}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      setSelectedPol(selectedOption)
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortOriginList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.type === "IMPORT" && props.portOriginDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Port Of Destination</label>
                  {/* <Select
                    defaultValue={defaultPDL}
                    isMulti
                    name="destinationPort"
                    options={props.type === "IMPORT" ? props.portOriginDataList : props.portDestinationDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    lassNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortDestinationList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.portOriginDataList : props.portDestinationDataList}
                    value={selectedPdl}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      setSelectedPdl(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortDestinationList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.type === "EXPORT" && props.portDestinationDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Port Of Destination</label>
                  {/* <Select
                    defaultValue={defaultPDL}
                    isMulti
                    name="destinationPort"
                    options={props.type === "IMPORT" ? props.portOriginDataList : props.portDestinationDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    lassNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortDestinationList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.portOriginDataList : props.portDestinationDataList}
                    value={selectedPdl}
                    onChange={(selectedOption) => {
                      setSelectedPdl(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setPortDestinationList(itemList);
                      console.log(`Option selected:`, selectedOption);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.hsCode4digitDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>HSCodes 4digit </label>
                  {/* <Select
                    defaultValue={default4digitHSCodes}
                    isMulti
                    name="hsCode4Digitlist"
                    options={props.hsCode4digitDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setHsCode4digitList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.hsCode4digitDataList}
                    value={selectedHsCode4Disgit}
                    onChange={(selectedOption) => {
                      setSelectedHsCode4Digit(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setHsCode4digitList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.hsCodeDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>HSCodes</label>
                  {/* <Select
                    defaultValue={defaultHSCodes}
                    isMulti
                    name="hsCodelist"
                    options={props.hsCodeDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setHsCodeList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.hsCodeDataList}
                    value={selectedHsCode}
                    onChange={(selectedOption) => {
                      setSelectedHsCode(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setHsCodeList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.importerDataList.length > 0 && (props.type == "EXPORT" && props.importerForExport == "Y") || props.type == "IMPORT" ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Importer</label>
                  {/* <Select
                    defaultValue={defaultImporters}
                    isMulti
                    name="importer"
                    options={props.importerDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setImporterList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.importerDataList}
                    value={selectedImporter}
                    onChange={(selectedOption) => {
                      setSelectedImporter(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setImporterList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {/* {props.type==="EXPORT" && props.importerDataList.length > 0 && props.countryCode != "USA" ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Importer</label>
                    <Select
                        defaultValue={defaultImporters}
                        isMulti
                        name="importer"
                        options={props.importerDataList}
                        className="dropdown bootstrap-select hero__form-input"
                        classNamePrefix="select"
                        onChange={(selectedOption) => {
                          let itemList = [];
                          selectedOption.forEach((item)=>{
                            itemList.push(item.value);
                          });
                          setImporterList(itemList);
                        }}
                    />
                  </div>
                </div> : null } */}

            {props.exporterDataList.length > 0 && (props.type == "IMPORT" && props.exporterForImport == "Y") || props.type == "EXPORT" ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Exporter</label>
                  {/* <Select
                    defaultValue={defaultExporters}
                    isMulti
                    name="exporter"
                    options={props.exporterDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setExporterList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.exporterDataList}
                    value={selectedExporter}
                    onChange={(selectedOption) => {
                      setSelectedExporter(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setExporterList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.type === "IMPORT" && props.countryOriginList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>{props.type === "IMPORT" ? "Country Of Origin" : "City Of Origin"}</label>
                  {/* <Select
                    defaultValue={defaultCityList}
                    isMulti
                    name="cityOfOrigin"
                    options={props.type === "IMPORT" ? props.countryOriginList : props.countryDestinationList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityOriginList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.countryOriginList : props.countryDestinationList}
                    value={selectedCityOrigin}
                    onChange={(selectedOption) => {
                      setSelectedCityOrigin(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityOriginList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.type === "EXPORT" && props.countryCode != "USA" && props.countryDestinationList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>{props.type === "IMPORT" ? "Country Of Origin" : "City Of Origin"}</label>
                  {/* <Select
                    defaultValue={defaultCityList}
                    isMulti
                    name="cityOfOrigin"
                    options={props.type === "IMPORT" ? props.countryOriginList : props.countryDestinationList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityOriginList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.countryOriginList : props.countryDestinationList}
                    value={selectedCityOrigin}
                    onChange={(selectedOption) => {
                      setSelectedCityOrigin(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityOriginList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.type === "IMPORT" && props.countryDestinationList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>{(props.countryCode === "IND" || props.countryCode === "SEZ") ? "City Of Destination" : "Country Of Destination"}</label>
                  {/* <Select
                    defaultValue={defaultCountryList}
                    isMulti
                    name="countryOfOrigin"
                    options={props.type === "IMPORT" ? props.countryDestinationList : props.countryOriginList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityDestinationList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.countryDestinationList : props.countryOriginList}
                    value={selectedCityDestination}
                    onChange={(selectedOption) => {
                      setSelectedCityDestination(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityDestinationList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}
            {props.type === "EXPORT" && props.countryOriginList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>{props.type === "IMPORT" ? "City Of Destination" : "Country Of Destination"}</label>
                  {/* <Select
                    defaultValue={defaultCountryList}
                    isMulti
                    name="countryOfOrigin"
                    options={props.type === "IMPORT" ? props.countryDestinationList : props.countryOriginList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityDestinationList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.type === "IMPORT" ? props.countryDestinationList : props.countryOriginList}
                    value={selectedCityDestination}
                    onChange={(selectedOption) => {
                      setSelectedCityDestination(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setCityDestinationList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.shipmentModeDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Shipment Mode</label>
                  {/* <Select
                    defaultValue={defaultShipmentMode}
                    isMulti
                    name="shippingMode"
                    options={props.shipmentModeDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });

                      setShipmentModeList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.shipmentModeDataList}
                    value={selectedShipmentMode}
                    onChange={(selectedOption) => {
                      setSelectedShipmentMode(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setShipmentModeList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.stdUnitDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Units</label>
                  {/* <Select
                    defaultValue={defaultUnits}
                    isMulti
                    name="stdUnitList"
                    options={props.stdUnitDataList}
                    className="dropdown bootstrap-select hero__form-input"
                    classNamePrefix="select"
                    onChange={(selectedOption) => {
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setStdUnitList(itemList);
                    }}
                  /> */}
                  <MultiSelect
                    options={props.stdUnitDataList}
                    value={selectedStdUnit}
                    onChange={(selectedOption) => {
                      setSelectedStdUnit(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setStdUnitList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Minimum Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="minquantity"
                  value={minQuantity}
                  onChange={handleMinQuantityChange}
                />
              </div>
            </div>

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Maximum Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  id="maxquantity"
                  value={maxQuantity}
                  onChange={handleMaxQuantityChange}
                />
              </div>
            </div>

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Minimum Value (in USD)</label>
                <input
                  type="text"
                  className="form-control"
                  id="minValue"
                  value={minValue}
                  onChange={handleMinValueChange}
                />
              </div>
            </div>

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Maximum Value (in USD)</label>
                <input
                  type="text"
                  className="form-control"
                  id="maxvalue"
                  value={maxValue}
                  onChange={handleMaxValueChange}
                />
              </div>
            </div>

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Minimum Unit price (in USD)</label>
                <input
                  type="text"
                  className="form-control"
                  id="minunitprice"
                  value={minUnitPrice}
                  onChange={handleMinUnitPriceChange}
                />
              </div>
            </div>

            <div className='col-6 mb-3'>
              <div className='hero__form-input'>
                <label>Maximum Unit price (in USD)</label>
                <input
                  type="text"
                  className="form-control"
                  id="maxunitprice"
                  value={maxUnitPrice}
                  onChange={handleMaxUnitPriceChange}
                />
              </div>
            </div>

            {props.consumptionTypeDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Consumption Type</label>
                  <MultiSelect
                    options={props.consumptionTypeDataList}
                    value={selectedConsumptionType}
                    onChange={(selectedOption) => {
                      setSelectedConsumptionType(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setConsumptionTypeList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            {props.incotermDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Incoterm</label>
                  <MultiSelect
                    options={props.incotermDataList}
                    value={selectedIncotermList}
                    onChange={(selectedOption) => {
                      setSelectedIncotermList(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setIncotermList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}



            {props.notifyPartyDataList.length > 0 ?
              <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                <div className="dropdown bootstrap-select hero__form-input">
                  <label>Notify Party</label>
                  <MultiSelect
                    options={props.notifyPartyDataList}
                    value={selectedNotifyPartyList}
                    onChange={(selectedOption) => {
                      setSelectedNotifyPartyList(selectedOption);
                      let itemList = [];
                      selectedOption.forEach((item) => {
                        itemList.push(item.value);
                      });
                      setNotifyPartyList(itemList);
                    }}
                    labelledBy="Select"
                  />
                </div>
              </div> : null}

            <div className='col-lg-12 col-md-4 col-sm-6 mb-3'>
              <div className='hero__form-input'>
                <label for="description_drop" className="form-label">Product description</label>
                <select
                  className="form-control"
                  aria-label="Default select example"
                  id="description_drop"
                  value={conditionProductDescription}
                  onChange={(e) => {
                    setConditionProductDescription(e.target.value);
                  }}
                >
                  <option value="C">Contains</option>
                  <option value="D">Does Not Contains</option>
                </select>
              </div>
            </div>
            <div className='col-lg-12 col-md-4 col-sm-6 mb-3'>
              <div className="input-search" >
                <CreatableSelect
                  isMulti
                  options={[]}
                  onChange={(selectedOption) => {
                    let itemList = [];
                    selectedOption.forEach((item) => {
                      itemList.push(item.value);
                    });
                    setDescriptionList(itemList);
                  }}
                />
              </div>
            </div>

          </div>
          :
          <div>No Matching Records Found. Please Reset ...</div>}
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-warning" type="reset" onClick={() => { resetAdvaceFilter() }}>Reset</button> &nbsp;
            {props.countryDestinationList.length > 0 || props.countryOriginList.length > 0 ||
              props.importerDataList.length > 0 || props.exporterDataList.length > 0 ||
              props.hsCodeDataList.length > 0 || props.hsCode4digitDataList.length > 0 ||
              props.portDestinationDataList.length > 0 || props.portOriginDataList.length > 0 ?
              <button className="btn btn-primary" type="button" onClick={() => { handleSubmit() }}>Search</button> : null}
          </div>
        </div>
      </form>
    </div>
  )
}

export default AdvanceSearch;