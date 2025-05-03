import React, { useState, useRef, useCallback, useEffect } from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';

const AdvanceSearch = (props) => {
console.log("props.exporterForImport === ", props.exporterForImport)
console.log("props.importerForExport === ", props.importerForExport)

  const [portOriginList, setPortOriginList] = useState([]); 
  const [portDestinationList, setPortDestinationList] = useState([]);
  const [hsCodeList, setHsCodeList] = useState([]);
  const [importerList, setImporterList] = useState([]);
  const [exporterList, setExporterList] = useState([]);
  const [cityOriginList, setCityOriginList] = useState([]); 
  const [cityDestinationList, setCityDestinationList] = useState([]);
  const [hsCode4DigitList, setHsCode4digitList] = useState([]);  
  const [shipmentModeList, setShipmentModeList] = useState([]);
  const [stdUnitList, setStdUnitList] = useState([]);

  const handleSubmit = () =>{
    const data = { portOriginList, portDestinationList, hsCodeList, importerList,exporterList,cityOriginList,cityDestinationList,hsCode4DigitList,shipmentModeList,stdUnitList };
    if(portOriginList.length == 0 && portDestinationList.length == 0 && hsCodeList.length == 0 && importerList.length == 0 
      && exporterList.length == 0 && cityOriginList.length == 0 && cityDestinationList.length == 0 && hsCode4DigitList.length == 0 
      && shipmentModeList.length == 0 && stdUnitList.length == 0){
        
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
    else{
      props.updateFilter(data);
    }
    
  }

  const resetAdvaceFilter = () =>{
    const data = { portOriginList:[], portDestinationList:[], hsCodeList:[], importerList:[],
      exporterList:[],cityOriginList:[],cityDestinationList:[], hsCode4DigitList:[], shipmentModeList: [],
      stdUnitList: [] , returnSearchId : props.searchId};
    // props.updateFilter(data);
    props.resetFilter(data);

  }

  useEffect(() => {
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
  }, [])

  let defaultPOL = ()=>{
    let pol = []
    props.portOriginList.forEach(item=>{
      pol.push({value:item,label:item});
    });
    return pol;
  }

  const updatePOL = ()=>{
    let pol = []
    props.portOriginList.forEach(item=>{
      pol.push(item);
    });
    setPortOriginList(pol);
  }

  let defaultPDL = ()=>{
    let pdl = []
    props.portDestinationList.forEach(item=>{
      pdl.push({value:item,label:item});
    });
    return pdl;
  }

  const UpdatePDL = ()=>{
    let pdl = []
    props.portDestinationList.forEach(item=>{
      pdl.push(item);
    });
    setPortDestinationList(pdl) ;
  }

  let defaultHSCodes = ()=>{
    let hsCodes = []
    props.hsCodeList.forEach(item=>{
      hsCodes.push({value:item,label:item});
    });
    return hsCodes;
  }

  const updateHSCodes = ()=>{
    let hsCodes = []
    props.hsCodeList.forEach(item=>{
      hsCodes.push(item);
    });
    setHsCodeList(hsCodes);
  }

  let default4digitHSCodes = ()=>{
    let hsCodes4Digits = []
    props.hsCode4DigitList.forEach(item=>{
      hsCodes4Digits.push({value:item,label:item});
    });
    return hsCodes4Digits;
  }

  const update4digitHSCodes = ()=>{
    let hsCodes4Digits = []
    props.hsCode4DigitList.forEach(item=>{
      hsCodes4Digits.push(item);
    });
    setHsCode4digitList(hsCodes4Digits);
  }

  let defaultImporters = ()=>{
    let importers = []
    props.importerList.forEach(item=>{
      importers.push({value:item,label:item});
    });
    return importers;
  }

  const updateImporters = ()=>{
    let importers = []
    props.importerList.forEach(item=>{
      importers.push(item);
    });
    setImporterList(importers);
  }

  let defaultExporters = ()=>{
    let exporters = []
    props.exporterList.forEach(item=>{
      exporters.push({value:item,label:item});
    });
    return exporters;
  }

  const updateExporters = ()=>{
    let exporters = []
    props.exporterList.forEach(item=>{
      exporters.push(item);
    });
    setExporterList(exporters);
  }

  let defaultCityList = ()=>{
    let cityList = []
    props.cityOriginList.forEach(item=>{
      cityList.push({value:item,label:item});
    });
    return cityList;
  }

  const updateCityList = ()=>{
    let cityList = []
    props.cityOriginList.forEach(item=>{
      cityList.push(item);
    });
    setCityOriginList(cityList);
  }


  let defaultCountryList = ()=>{
    let CityDestinationList = []
    props.cityDestinationList.forEach(item=>{
      CityDestinationList.push({value:item,label:item});
    });
    return CityDestinationList;
  }

  const updateCountryList = ()=>{
    let CityDestinationList = []
    props.cityDestinationList.forEach(item=>{
      CityDestinationList.push(item);
    });
    setCityDestinationList(CityDestinationList);
  }

  let defaultShipmentMode = ()=>{
    let ShipmentModeLst = []
    props.shipmentModeList.forEach(item=>{
      ShipmentModeLst.push({value:item,label:item});
    });
    return ShipmentModeLst;
  }

  const updateShipmentMode = ()=>{
    let ShipmentModeLst = []
    props.shipmentModeList.forEach(item=>{
      ShipmentModeLst.push(item);
    });
    setShipmentModeList(ShipmentModeLst);
  }

  let defaultUnits = ()=>{
    let StdUnitList = []
    props.stdUnitList.forEach(item=>{
      StdUnitList.push({value:item,label:item});
    });
    return StdUnitList;
  }

  const updateUnits = ()=>{
    let StdUnitList = []
    props.stdUnitList.forEach(item=>{
      StdUnitList.push(item);
    });
    setStdUnitList(StdUnitList);
  }



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

              <div className="row ad-mid">
              {props.type==="IMPORT" && props.portDestinationDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Port Of Origin</label>
                    <Select
                      defaultValue={defaultPOL}
                      isMulti
                      name="colors"
                      options={props.type==="IMPORT"?props.portDestinationDataList:props.portOriginDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setPortOriginList(itemList);
                        console.log(`Option selected:`,selectedOption);
                      }}
                      classNamePrefix="select"
                    />
                  </div>
                </div> : null }
                {props.type==="EXPORT" && props.portOriginDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Port Of Origin</label>
                    <Select
                      defaultValue={defaultPOL}
                      isMulti
                      name="colors"
                      options={props.type==="IMPORT"?props.portDestinationDataList:props.portOriginDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setPortOriginList(itemList);
                        console.log(`Option selected:`,selectedOption);
                      }}
                      classNamePrefix="select"
                    />
                  </div>
                </div> : null }
              {props.type==="IMPORT" && props.portOriginDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Port Of Destination</label>
                    <Select
                      defaultValue={defaultPDL}
                      isMulti
                      name="destinationPort"
                      options={props.type==="IMPORT"?props.portOriginDataList:props.portDestinationDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      lassNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setPortDestinationList(itemList);
                        console.log(`Option selected:`,selectedOption);
                      }}
                    />
                  </div>
                </div> : null }
                {props.type==="EXPORT" && props.portDestinationDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Port Of Destination</label>
                    <Select
                      defaultValue={defaultPDL}
                      isMulti
                      name="destinationPort"
                      options={props.type==="IMPORT"?props.portOriginDataList:props.portDestinationDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      lassNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setPortDestinationList(itemList);
                        console.log(`Option selected:`,selectedOption);
                      }}
                    />
                  </div>
                </div> : null }

              {props.hsCode4digitDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>HSCodes 4digit </label>
                    <Select
                      defaultValue={default4digitHSCodes}
                      isMulti
                      name="hsCode4Digitlist"
                      options={props.hsCode4digitDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setHsCode4digitList(itemList);
                      }}
                    />
                  </div>
                </div> : null }
              {props.hsCodeDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>HSCodes</label>
                    <Select
                      defaultValue={defaultHSCodes}
                      isMulti
                      name="hsCodelist"
                      options={props.hsCodeDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setHsCodeList(itemList);
                      }}
                    />
                  </div>
                </div> : null }

              { props.importerDataList.length > 0 && (props.type == "EXPORT" && props.importerForExport == "Y") || props.type == "IMPORT" ?
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
                </div> : null }

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

              {props.exporterDataList.length > 0 && (props.type == "IMPORT" && props.exporterForImport == "Y" )|| props.type == "EXPORT" ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Exporter</label>
                    <Select
                        defaultValue={defaultExporters}
                        isMulti
                        name="exporter"
                        options={props.exporterDataList}
                        className="dropdown bootstrap-select hero__form-input"
                        classNamePrefix="select"
                        onChange={(selectedOption) => {
                          let itemList = [];
                          selectedOption.forEach((item)=>{
                            itemList.push(item.value);
                          });
                          setExporterList(itemList);
                        }}
                    />
                  </div>
                </div> : null }

              {props.type==="IMPORT" && props.countryOriginList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>{props.type==="IMPORT"?"Country Of Origin":"City Of Origin"}</label>
                    <Select
                      defaultValue={defaultCityList}
                      isMulti
                      name="cityOfOrigin"
                      options={props.type==="IMPORT"?props.countryOriginList:props.countryDestinationList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setCityOriginList(itemList);
                      }}
                    />
                  </div>
                </div> : null }
                {props.type==="EXPORT" && props.countryCode != "USA" && props.countryDestinationList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>{props.type==="IMPORT"?"Country Of Origin":"City Of Origin"}</label>
                    <Select
                      defaultValue={defaultCityList}
                      isMulti
                      name="cityOfOrigin"
                      options={props.type==="IMPORT"?props.countryOriginList:props.countryDestinationList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setCityOriginList(itemList);
                      }}
                    />
                  </div>
                </div> : null }

              {props.type==="IMPORT" && props.countryDestinationList.length > 0  ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>{(props.countryCode === "IND" || props.countryCode === "SEZ") ?"City Of Destination":"Country Of Destination"}</label>
                    <Select
                      defaultValue={defaultCountryList}
                      isMulti
                      name="countryOfOrigin"
                      options={props.type==="IMPORT"?props.countryDestinationList:props.countryOriginList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setCityDestinationList(itemList);
                      }}
                    />
                  </div>
                </div> : null }
                {props.type==="EXPORT" && props.countryOriginList.length > 0  ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>{props.type==="IMPORT"?"City Of Destination":"Country Of Destination"}</label>
                    <Select
                      defaultValue={defaultCountryList}
                      isMulti
                      name="countryOfOrigin"
                      options={props.type==="IMPORT"?props.countryDestinationList:props.countryOriginList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setCityDestinationList(itemList);
                      }}
                    />
                  </div>
                </div> : null }

                {props.shipmentModeDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Shipment Mode</label>
                    <Select
                      defaultValue={defaultShipmentMode}
                      isMulti
                      name="shippingMode"
                      options={props.shipmentModeDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        
                        setShipmentModeList(itemList);
                      }}
                    />
                  </div>
                </div> : null }

                {props.stdUnitDataList.length > 0 ?
                <div className="col-lg-12 col-md-4 col-sm-6 mb-3">
                  <div className="dropdown bootstrap-select hero__form-input">
                    <label>Units</label>
                    <Select
                      defaultValue={defaultUnits}
                      isMulti
                      name="stdUnitList"
                      options={props.stdUnitDataList}
                      className="dropdown bootstrap-select hero__form-input"
                      classNamePrefix="select"
                      onChange={(selectedOption) => {
                        let itemList = [];
                        selectedOption.forEach((item)=>{
                          itemList.push(item.value);
                        });
                        setStdUnitList(itemList);
                      }}
                    />
                  </div>
                </div> : null }

              </div>
          : 
          <div>No Matching Records Found. Please Reset ...</div>}
          <div className="row">
            <div className="col-sm-12">
              <button className="btn btn-warning" type="reset" onClick={()=>{resetAdvaceFilter()}}>Reset</button> &nbsp; 
              {props.countryDestinationList.length > 0 || props.countryOriginList.length > 0 ||
                props.importerDataList.length > 0 || props.exporterDataList.length > 0 ||
                props.hsCodeDataList.length > 0 || props.hsCode4digitDataList.length > 0 ||
                props.portDestinationDataList.length > 0 || props.portOriginDataList.length > 0 ?
              <button className="btn btn-primary" type="button" onClick={()=>{handleSubmit()}}>Search</button> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }

  export default AdvanceSearch;