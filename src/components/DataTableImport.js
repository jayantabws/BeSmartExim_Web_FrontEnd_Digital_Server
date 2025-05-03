import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IconButton, Pagination, TagPicker,Checkbox } from 'rsuite';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import 'rsuite/dist/rsuite.min.css';
import { FaPlusSquare, FaMinusSquare, FaBeer } from 'react-icons/fa';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { Dropdown, DropdownButton, Modal,  OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory,Link } from 'react-router-dom';
import AxiosACT from "../shared/AxiosACT";
import {columnListImportDashboardIND, columnListImportForeign, columnListImportUSA} from "../shared/TradeColumnList";


//const defaultSelectedColumns = ['hs_code', 'date', 'prod_desc', 'qty', 'importer', 'shipmentport', 'foreign_exporter', 'for_port', 'ind_port', 'for_count'];
const rowKey = 'id';

const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }) => (
    <Cell {...props}>
        <IconButton
            size="xs"
            appearance="subtle"
            onClick={() => {
                onChange(rowData);
            }}
            icon={
                expandedRowKeys.some((key) => key === rowData[rowKey]) ? <FaMinusSquare /> : <FaPlusSquare />
            }
        />
    </Cell>
);
const renderRowExpanded = (rowData) => {
    return (
        <div style={{ minHeight: '220px', width: 'auto', paddingLeft: '40px', backgroundColor: 'lightgray',padding:'6px' }}>
            <div className="row">
                <div className="col-md-2">
                    <p><b>Sl:</b> {rowData.id}</p>
                    <p><b>HSCODE:</b> {rowData.hs_code}</p>
                    <p><b>IEC:</b> {rowData.iec}</p>
                    <p><b>Indian Company Name:</b> {rowData.importer}</p>
                    <p><b>ADDRESS1:</b> {rowData.address1}</p>
                    <p><b>ADDRESS2:</b> {rowData.address2}</p>
                </div>
                <div className="col-md-2">
                    <p><b>CITY:</b> {rowData.city}</p>
                    <p><b>PIN:</b> {rowData.pin}</p>
                    <p><b>PROD_DESC:</b> {rowData.prod_desc}</p>
                    <p><b>IND_PORT:</b> {rowData.ind_port}</p>
                    <p><b>FOR_COUNT:</b> {rowData.for_count}</p>
                    <p><b>FOR_PORT:</b> {rowData.for_port}</p>
                    <p><b>VALUE:</b> {rowData.value}</p>
                </div>
                <div className="col-md-2">
                    <p><b>VALUE(US$):</b> {rowData.value_usd}</p>
                    <p><b>QTY:</b> {rowData.qty}</p>
                    <p><b>UNIT:</b> {rowData.unit}</p>
                    <p><b>VAL_DUTY_INR:</b> {rowData.val_duty_inr}</p>
                    <p><b>VAL_DUTY_USD:</b> {rowData.val_duty_usd}</p>
                    <p><b>Applicable DUTY:</b> {rowData.applicable_duty}</p>
                </div>
                <div className="col-md-2">
                    <p><b>UNIT RATE(IND RS):</b> {rowData.unit_rate_inr}</p>
                    <p><b>SHIP_MODE:</b> {rowData.ship_mode}</p>
                    <p><b>UNIT RATE(USD):</b> {rowData.unit_rate_usd}</p>
                    <p><b>BENO:</b> {rowData.beno}</p>
                    <p><b>CHA_NAME:</b> {rowData.cha_name}</p>
                    <p><b>Actual DUTY:</b> {rowData.actual_duty}</p>
                </div>
                <div className="col-md-1">
                    <p><b>Total Duty On Entire BE:</b> {rowData.total_duty_on_entire_be}</p>
                    <p><b>Typ:</b> {rowData.typ}</p>
                    <p><b>AG:</b> {rowData.ag}</p>
                    <p><b>Inv No:</b> {rowData.inv_no}</p>
                    <p><b>Item No:</b> {rowData.item_no}</p>
                    <p><b>UnitPrice FC:</b> {rowData.unitprice_fc}</p>
                </div>
                <div className="col-md-1">
                    <p><b>Currency:</b> {rowData.currency}</p>
                    <p><b>Foreign Exporter:</b> {rowData.foreign_exporter}</p>
                    <p><b>Foreign Address:</b> {rowData.foreign_address}</p>
                    <p><b>Date:</b> {rowData.date}</p>
                    <p><b>CUSH:</b> {rowData.cush}</p>
                    <p><b>Location:</b> {rowData.location}</p>
                    <p><b>Inv_Date:</b> {rowData.inv_date}</p>
                </div>
                <div className="col-md-1">
                    <p><b>Inv_Srl_No:</b> {rowData.inv_srl_no}</p>
                    <p><b>Inv_Value:</b> {rowData.inv_value}</p>
                    <p><b>ForCntry_Code:</b> {rowData.forcntry_code}</p>
                    <p><b>FORPORT_Code:</b> {rowData.forport_code}</p>
                    <p><b>ShipmentPort Code:</b> {rowData.shipmentportcode}</p>
                    <p><b>ShipmentPort:</b> {rowData.shipmentport}</p>
                    <p><b>BCD Notn:</b> {rowData.bcd_notn}</p>
                </div>
                <div className="col-md-1">
                    <p><b>BCD Rate:</b> {rowData.bcd_rate}</p>
                    <p><b>BCD Amt:</b> {rowData.bcd_amt}</p>
                    <p><b>CVD Notn:</b> {rowData.cvd_notn}</p>
                    <p><b>CVD Rate:</b> {rowData.cvd_rate}</p>
                    <p><b>CVD Amt</b> {rowData.cvd_amt}</p>
                    <p><b>IGST Amt</b> {rowData.igst_amt}</p>
                    <p><b>GST Cess Amt</b> {rowData.gst_cess_amt}</p>
                </div>
            </div>
        </div>
    );
};
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        <Checkbox
          value={rowData[dataKey]}
          inline
          onChange={onChange}
          checked={checkedKeys.some(item => item === rowData[dataKey])}
        />
      </div>
    </Cell>
  );
export default function DataTableImport(props) {
    let columnListImportDashboard = props.countryCode ==  "IND" || props.countryCode ==  "SEZ" ? columnListImportDashboardIND : props.countryCode ==  "USA"? columnListImportUSA : columnListImportForeign
    let tempDefaultSelectedColumns = columnListImportDashboard.filter(column => props.filteredColumn.some(key => key === column.key));
    let defaultSelectedColumns = []
    tempDefaultSelectedColumns.map(column => defaultSelectedColumns.push(column.key));
    let searchId = props.search_id ? props.search_id : null

    let checked = false;
    let indeterminate = false;
    let data = props.searchResult
    let newColumnsKeys = props.newColumnsKeys.length > 0 ? props.newColumnsKeys : defaultSelectedColumns.slice(0,10)

    const [columnKeys, setColumnKeys] = useState(newColumnsKeys);
    const [loading, setLoading] = useState(false);
    const [compact, setCompact] = useState(true);
    const [bordered, setBordered] = useState(true);
    const [noData, setNoData] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [autoHeight, setAutoHeight] = useState(false);
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [rowDataModal, setRowDataModal] = useState(true);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const nodeRef = React.createRef(null)
    
    let defaultColumns = []
    columnListImportDashboard.map((item,index) => {
        let objColumns = Object.keys(item);
        if( props.filteredColumn.includes(item.key) ){
            defaultColumns.push(item)
        }  
    })

    if (checkedKeys.length === data.length) {
        checked = true;
      } else if (checkedKeys.length === 0) {
        checked = false;
      } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
        indeterminate = true;
      }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? data.map(item => item.id) : [];
        setCheckedKeys(keys);
      };
      const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value); 
        setCheckedKeys(keys);
      };

    const columns = columnListImportDashboard.filter(column => columnKeys.some(key => key === column.key));
    const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
    const CompactHeaderCell = props => (
        <HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
    );
    const CustomCell = compact ? CompactCell : Cell;
    const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;

    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const handleExpanded = (rowData, dataKey) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach((key) => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys);
    };

    const handleModal = (rowData)  => {
        setShowModal(true)
        setRowDataModal(rowData)
    }

    const handleModalClose = (rowData)  => {
        setShowModal(false)
        setRowDataModal([])
    }

    

    const ExpandCellModal = ({ rowData, dataKey, expandedRowKeys, ...props }) => (
        <Cell {...props}>
            <IconButton
                size="xs"
                appearance="subtle"
                onClick={() => { handleModal(rowData) } }
                icon={ <FaBeer /> }
            />
        </Cell>
    );

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            props.setOrderByColumn(sortColumn);
            props.setOrderByMode(sortType);
        }, 500);
    };

    const history = useHistory();

    const googleRedirect = (keyValue) => {
        window.open(`https://www.google.com/search?q=${keyValue}`);
    }

    const handleSaveContact = (companyName) => {
        const postData = {
            "companyName": companyName,
            "address": null,
            "email": null,
            "mobile": null,
            "website": null
        }
        AxiosACT({
            method: "POST",
            url: `/activity-management/savecontact`,
            data: JSON.stringify(postData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.data == "CREATED"){
                    Swal.fire({
                        title: 'Success',
                        text: "Contact saved successfully",
                        icon: 'success',
                    })
                }
                else {
                    Swal.fire({
                        title: 'error',
                        text: "Duplicate Contact",
                        icon: 'error',
                    })
                }
            })
            .catch(err => {
                console.log("Err", err);
                let errorMsg = "Somethhing went wrong, please try again."
                if (err.data.errorMsg) {
                    errorMsg = err.data.errorMsg;
                }
                Swal.fire({
                    title: 'Oops!',
                    text: errorMsg,
                    icon: 'error',
                })
            });
    }

    return (
        <>
            <div className="data-menu mt-4 mb-2 text-right">
                <ul>
                    <li className="tableHeaderSelect">
                        <DropdownMultiselect
                            options={defaultColumns}
                            name="countries"
                            handleOnChange={(selected) => {
                                
                                if (selected.length > 100) {
                                    selected = selected.slice(0, 100);
                                    Swal.fire({
                                        title: 'Alert!',
                                        text: 'Column display limit reached, max 10 are allowed',
                                        icon: 'error',
                                        confirmButtonText: 'OK'
                                    });
                                    setColumnKeys(selected);
                                } else {
                                    setColumnKeys(selected)
                                }
                                // console.log(selected);
                            }}
                            selected={columnKeys}
                            placeholder="Custom"
                            placeholderMultipleChecked="Custom"
                            buttonClass="cus-drop"
                            selectDeselectLabel={null}
                        />
                    </li>
                    {/* <li><i className="icon ion-md-repeat"></i> Custom Sort</li> */}
                    <li onClick={() => { props.exportToCSV(); }}><i className="icon ion-md-download"></i> Export All</li>
                    <li onClick={() => { 
                        checkedKeys.length > 0 ? props.exportSelectedToCSV(checkedKeys) : 
                        Swal.fire({
                            title: 'Oops!',
                            text: "Please select rows",
                            icon: 'error',
                          });
                        }}><i className="icon ion-md-download"></i> Export Selected</li>
                    <li className="customMenu">
                        <DropdownButton id="dropdown-basic-button" title="Save Query">
                          {props.state && props.state.hasOwnProperty("workspaceId") && props.state.workspaceId != "" ? <Dropdown.Item onClick={() => {  props.saveQuery()}}>Save</Dropdown.Item> : null }
                            <Dropdown.Item onClick={() => { props.setWorkspace(true); }}>Save as</Dropdown.Item>
                        </DropdownButton></li>

                    <li className="customMenu">
                        <DropdownButton id="dropdown-basic-button" title="Go to">
                            <Dropdown.Item >
                                <Link to={{ 
                                pathname: "/analysis", 
                                state: {search_id : searchId , workspaceData : props.state, columnKeys: columnKeys,
                                    importerForExport : props.importerForExport, exporterForImport : props.exporterForImport
                                }
                                }}> Macro Analysis </Link>
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick = {(e)=>{
                                 Swal.fire({
                                    title: 'Info',
                                    text: "This Feature is Coming Soon",
                                    icon: 'info',
                                })
                            }}> */}
                            <Dropdown.Item >
                                <Link to= {{ 
                                pathname: "/indepthAnalysis", 
                                state: {search_id : searchId , columnKeys: columnKeys, workspaceData : props.state,
                                    importerForExport : props.importerForExport, exporterForImport : props.exporterForImport
                                 },
                                }}> In-depth Analysis </Link>
                            </Dropdown.Item>
                        </DropdownButton></li>
                    </ul>
            </div>

            <div className="row">
                <div className="col-md-12">
                    {/* {props.searchLoading?(
                    <div className="loaderBlock">
                        <div className="loader"></div>
                    </div>
                    ):null} */}
                    <Table 
                        loading={loading || props.searchLoading}
                        height={500}
                        // hover={hover}
                        // showHeader={showHeader}
                        // autoHeight={autoHeight}
                        data={props.searchResult}
                        // bordered={bordered}
                        // cellBordered={bordered}
                        // headerHeight={compact ? 30 : 40}
                        // rowHeight={compact ? 30 : 46}
                        rowKey={rowKey}
                        expandedRowKeys={expandedRowKeys}
                        onRowClick={(data) => {
                            // console.log(data);
                        }}
                        renderRowExpanded={renderRowExpanded}
                        rowExpandedHeight={310}
                     //   rowExpandedWidth={650}
                        sortColumn={props.orderByColumn}
                        sortType={props.orderByMode}
                        onSortColumn={handleSortColumn}
                    >
                        <Column width={70} align="center">
                        <CustomHeaderCell style={{ padding: 0 }}>
                            <div style={{ lineHeight: '40px' }}>
                                <Checkbox
                                inline
                                checked={checked}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                                />
                            </div>
                        </CustomHeaderCell>
                        <CheckCell dataKey="id" checkedKeys={checkedKeys} onChange={handleCheck} />
                        </Column>
                        
                        {
                        props.countryCode == "XXXXX" ?
                            <Column width={70} align="center">
                                <CustomHeaderCell>#</CustomHeaderCell>
                                <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                            </Column>
                        : null
                        }

                        <Column width={70} align="center">
                            <CustomHeaderCell>Action</CustomHeaderCell>
                            <ExpandCellModal dataKey="id" expandedRowKeys={expandedRowKeys}  />
                        </Column>
                        {columns.map(column => {
                            const { key, label, ...rest } = column;
                            return (
                                <Column {...rest} key={key} sortable resizable>
                                    <CustomHeaderCell>{label}</CustomHeaderCell>
                                   
                                        <Cell dataKey={key}>
                                            {rowData => {
                                            return (
                                                <OverlayTrigger
                                                placement="left"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip className="show"> {`${rowData[key]}`}</Tooltip>}
                                                >
                                                <span>
                                                {(key === "importer" || key === "foreign_exporter") ? (    
                                                <>
                                                    <a onClick={() => googleRedirect(rowData[key])}><i className="icon ion-ios-map"></i> </a> 
                                                    <a onClick={() => handleSaveContact(rowData[key])}><i className="icon ion-ios-save"></i> </a> |{' '}
                                                </>): null }
                                                    {`${rowData[key]}`}
                                                </span>
                                                </OverlayTrigger>
                                            );
                                        }}
                                        </Cell>
                                   
                                </Column>
                            );
                        })}
                    </Table>

                    {props.totalRecord > 0 ? (
                        <div style={{ padding: 20 }}>
                            <Pagination
                                prev
                                next
                                first
                                last
                                ellipsis
                                boundaryLinks
                                maxButtons={5}
                                size="xs"
                                layout={['total', '-', 'limit', '|', 'pager']}
                                //layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                                total={props.totalRecord > 10000 ? 10000 : props.totalRecord}
                                limitOptions={[10, 20, 30, 40, 50, 100, 200]}
                                limit={props.limit}
                                activePage={props.page}
                                onChangePage={props.setPage}
                                onChangeLimit={props.handleChangeLimit}
                            />
                        </div>
                    ) : null}
                </div>
                <div>
                { rowDataModal ? 
                <Modal className="" bssize="md"
                    show={showModal}
                    onHide={handleModalClose} 
                    >             
                    <Modal.Header closeButton > Description </Modal.Header>
                    <Modal.Title >  </Modal.Title>

                        <Modal.Body style= {{ height: '80vh', overflow : 'auto', scrollbarWidth : '10px' } }>
                        <div>
                        {Object.keys(rowDataModal).map((item,index) => (
                            columnListImportDashboard.map((val,i) => (
                                <div key = {index+i}>
                                {rowDataModal[item] != null && val.key == item ? <p ref = {nodeRef}><b>{val.label}:</b> {rowDataModal[item]}</p> :null}
                                </div>
                            ))
                        ))}
                        </div>
                        </Modal.Body>
                            
                </Modal>
                : null}
                </div>
            </div>

        </>
    );

}