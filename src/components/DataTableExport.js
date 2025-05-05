import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IconButton, Pagination, TagPicker, Checkbox } from 'rsuite';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import 'rsuite/dist/rsuite.min.css';
import { FaPlusSquare, FaMinusSquare, FaBeer } from 'react-icons/fa';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import moment from 'moment';
import Swal from 'sweetalert2';
import { Dropdown, DropdownButton, Modal, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import AxiosACT from "../shared/AxiosACT";
import { columnListExportDashboardIND, columnListExportForeign, columnListExportUSA } from "../shared/TradeColumnList"
import { MultiSelect } from "react-multi-select-component";
import DataTableCoutryFilterModal from '../shared/DataTableCoutryFilterModal';
import { FaFilter } from "react-icons/fa";
import { useSelector } from 'react-redux';

import Axios from '../shared/Axios';
import DataTableCoulumnFilter from '../shared/DataTableCoulumnFilter';


// const defaultSelectedColumns = ['sb_no', 'hs_code', 'sb_date', 'product', 'qty', 'indian_exportar_name', 'foreign_importer_name', 'importer_country', 'foreign_exporter', 'for_port', 'port_of_destination', 'port_of_origin'];
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
        <div style={{ minHeight: '220px', width: 'auto', paddingLeft: '40px', backgroundColor: 'lightgray', padding: '6px' }}>
            <div className="row">
                <div className="col-md-2">
                    <p><b>SB_NO:</b> {rowData.sb_no}</p>
                    <p><b>SB_Date:</b> {moment(rowData.sb_date).format("DD-MMM-YYYY")}</p>
                    <p><b>Hs_Code:</b> {rowData.hs_code}</p>
                    <p><b>Product:</b> {rowData.product}</p>
                    <p><b>QTY:</b> {rowData.qty}</p>
                    <p><b>Unit:</b> {rowData.unit}</p>
                </div>
                <div className="col-md-2">
                    <p><b>Invoice No:</b> {rowData.invoice_no}</p>
                    <p><b>Total SB Value in INR in Lacs:</b> {rowData.total_sb_value_in_inr_in_lacs}</p>
                    <p><b>Value IN FC:</b> {rowData.value_in_fc}</p>
                    <p><b>Unit Rate in Foreign Currency:</b> {rowData.unit_rate_in_foreign_currency}</p>
                    <p><b>Unit Rate Currency:</b> {rowData.unit_rate_currency}</p>
                    <p><b>Port of Destination:</b> {rowData.port_of_destination}</p>
                </div>
                <div className="col-md-2">
                    <p><b>City of Destination:</b> {rowData.city_of_destination}</p>
                    <p><b>Port of Origin:</b> {rowData.port_of_origin}</p>
                    <p><b>Indian Exporter Name:</b> {rowData.indian_exportar_name}</p>
                    <p><b>Exporter Add1:</b> {rowData.exporter_add1}</p>
                    <p><b>Exporter Add2:</b> {rowData.exporter_add2}</p>
                    <p><b>Exporter City:</b> {rowData.exporter_city}</p>
                </div>
                <div className="col-md-2">
                    <p><b>Foreign Importer Name:</b> {rowData.foreign_importer_name}</p>
                    <p><b>FOR_Add1:</b> {rowData.for_add1}</p>
                    <p><b>FOR_Add2:</b> {rowData.for_add2}</p>
                    <p><b>FOR_Add3:</b> {rowData.for_add3}</p>
                    <p><b>FOR_Add4:</b> {rowData.for_add4}</p>
                    <p><b>Importer Country:</b> {rowData.importer_country}</p>
                </div>
                <div className="col-md-2">
                    <p><b>Month:</b> {rowData.month}</p>
                    <p><b>HS2:</b> {rowData.hs2}</p>
                    <p><b>HS4:</b> {rowData.hs4}</p>
                    <p><b>Cur_que:</b> {rowData.cur_que}</p>
                    <p><b>Item_no:</b> {rowData.item_no}</p>
                    <p><b>IEC:</b> {rowData.iec}</p>
                </div>
                <div className="col-md-1">
                    <p><b>Invoice Srl No:</b> {rowData.invoice_srl_no}</p>
                    <p><b>Challan No:</b> {rowData.challan_no}</p>
                    <p><b>DRAW BACK:</b> {rowData.draw_back}</p>
                    <p><b>RAW_PORT:</b> {rowData.raw_port}</p>
                    <p><b>CUSH:</b> {rowData.cush}</p>
                    <p><b>Invoice_Date:</b> {rowData.invoice_date}</p>
                </div>
                <div className="col-md-1">
                    <p><b>CHA_NO:</b> {rowData.cha_no}</p>
                    <p><b>CHA_NAME:</b> {rowData.cha_name}</p>
                    <p><b>For_Port_Code:</b> {rowData.for_port_code}</p>
                    <p><b>LEO_Date:</b> {rowData.leo_date}</p>
                    <p><b>CountryCode:</b> {rowData.country_code}</p>
                    <p><b>Drawback_Excise:</b> {rowData.drawback_excise}</p>
                    <p><b>Drawback_Customs:</b> {rowData.drawback_customs}</p>
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
export default function DataTableExport(props) {
    let searchQuery = useSelector(state => state.data.searchQuery);
    // console.log("Search Query >>> ", searchQuery)
    let columnListExportDashboard = props.countryCode.includes("IND") || props.countryCode.includes("SEZ") ? columnListExportDashboardIND : props.countryCode.includes("USA") ? columnListExportUSA : columnListExportForeign
    let tempDefaultSelectedColumns = columnListExportDashboard.filter(column => props.filteredColumn.some(key => key === column.key));
    let defaultSelectedColumns = []
    tempDefaultSelectedColumns.map(column => defaultSelectedColumns.push(column.key));

    let searchId = props.search_id ? props.search_id : null
    let checked = false;
    let indeterminate = false;
    let data = props.searchResult
    let newColumnsKeys = props.newColumnsKeys.length > 0 ? props.newColumnsKeys : defaultSelectedColumns.slice(0, 10)

    //  console.log("newColumnsKeys ====== ", newColumnsKeys)
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

    const [countryModal, setCountryModal] = useState(false);

    // State for modal, current column, and dropdown values
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filterColumn, setFilterColumn] = useState(null);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);


    const nodeRef = React.createRef(null)

    let defaultColumns = []
    columnListExportDashboard.map((item, index) => {
        let objColumns = Object.keys(item);
        if (props.filteredColumn.includes(item.key)) {
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

    const columns = columnListExportDashboard.filter(column => columnKeys.some(key => key === column.key));
    const CompactCell = props => <Cell {...props} style={{ padding: 4 }} />;
    // const CompactHeaderCell = props => (
    //     <HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
    // );
    const CompactHeaderCell = ({ children, columnKey, ...props }) => (
        <HeaderCell
            {...props}
            style={{
                padding: 4,
                backgroundColor: "#3498ff",
                color: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <span>{children}</span>
            <FaFilter
                style={{ cursor: "pointer", marginLeft: 8 }}
                onClick={() => {
                    console.log("Column Key >>> ", columnKey);
                    handleOpenFilter(columnKey, children)
                }}
            />
        </HeaderCell>
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

    const handleModal = (rowData) => {
        setShowModal(true)
        setRowDataModal(rowData)
    }

    const handleModalClose = (rowData) => {
        setShowModal(false)
        setRowDataModal([])
    }


    const ExpandCellModal = ({ rowData, dataKey, expandedRowKeys, ...props }) => (
        <Cell {...props}>
            <IconButton
                size="xs"
                appearance="subtle"
                onClick={() => { handleModal(rowData) }}
                icon={<FaBeer />}
            />
        </Cell>
    );

    const handleSortColumn = (sortColumn, sortType) => {
        console.log("sortColumn === ", sortColumn)
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
                if (res.data == "CREATED") {
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

    const handleOpenFilter = async (columnKey, label) => {
        try {
            setFilterColumn(label);
            setShowFilterModal(true);

            let updatedPayload = searchQuery;
            updatedPayload["columnName"] = columnKey;

            // console.log("Check colum filter request >>> ", updatedPayload)
            Axios({
                method: "POST",
                url: `/search-management/listdistinctcolumnvalue`,
                data: JSON.stringify(updatedPayload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    // console.log("Column value >>> ", res.data.distinctColumnValuesList);
                    let apiResponse = res.data.distinctColumnValuesList;
                    // let formattedOptions = apiResponse.map(({ column_name, records_count }) => ({
                    //     label: `${column_name} (${records_count})`,
                    //     value: column_name
                    // }));

                    setFilterOptions(apiResponse);
                })
        } catch (e) {
            console.log(e);
            setFilterOptions([]);
        }

        // Fetch options from your API
        // const data = await response.json();

        // Format options for react-multi-select-component
        // const formattedOptions = data.map(item => ({
        //     label: item,
        //     value: item
        // }));

        // const formattedOptions = [
        //     { label: "Option 1", value: "1" },
        //     { label: "Option 2", value: "2" },
        //     { label: "Option 3", value: "3" },
        // ];

    };

    const handleApplyFilter = () => {
        // Call your API with selected filter values
        const selectedValues = selectedOptions.map(opt => opt.value);
        // props.onApplyFilter(filterColumn, selectedValues);
        setShowFilterModal(false);
    };

    return (
        <>
            {/* {console.log("props.searchResult",props.searchResult)} */}
            <div className="data-menu mt-4 mb-2 text-right">
                <ul>
                    <li style={{ background: "#ffc107", color: "blue" }} onClick={() => setCountryModal(true)}>All Countries ({props.totalRecord})</li>
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
                                    })
                                    //   return false;
                                    setColumnKeys(selected);
                                } else {
                                    setColumnKeys(selected)
                                }
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
                            {props.state && props.state.hasOwnProperty("workspaceId") && props.state.workspaceId != "" ? <Dropdown.Item onClick={() => { props.saveQuery() }}>Save</Dropdown.Item> : null}
                            <Dropdown.Item onClick={() => { props.setWorkspace(true); }}>Save as</Dropdown.Item>
                        </DropdownButton></li>
                    {/* <li><i className="icon ion-md-menu"></i> Go to</li> */}

                    <li className="customMenu">
                        <DropdownButton id="dropdown-basic-button" title="Go to">
                            <Dropdown.Item >
                                <Link to={{
                                    pathname: "/analysis",
                                    state: {
                                        search_id: searchId, columnKeys: columnKeys, workspaceData: props.state,
                                        importerForExport: props.importerForExport, exporterForImport: props.exporterForImport
                                    },
                                }}> Macro Analysis </Link>
                            </Dropdown.Item>
                            {/* <Dropdown.Item onClick = {(e)=>{
                                 Swal.fire({
                                    title: 'Info',
                                    text: "This Feature is Coming Soon",
                                    icon: 'info',
                                })
                            }}
                            >    */}
                            <Dropdown.Item >
                                <Link to={{
                                    pathname: "/indepthAnalysis",
                                    state: {
                                        search_id: searchId, columnKeys: columnKeys, workspaceData: props.state,
                                        importerForExport: props.importerForExport, exporterForImport: props.exporterForImport
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
                        // hover={true}
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
                            props.countryCode.includes("XXXXX") ?
                                <Column width={70} align="center">
                                    <CustomHeaderCell>#</CustomHeaderCell>
                                    <ExpandCell dataKey="id" expandedRowKeys={expandedRowKeys} onChange={handleExpanded} />
                                </Column>
                                : null
                        }


                        <Column width={70} align="center">
                            <CustomHeaderCell>Action</CustomHeaderCell>
                            <ExpandCellModal dataKey="id" expandedRowKeys={expandedRowKeys} />
                        </Column>
                        {columns.map(column => {
                            const { key, label, ...rest } = column;
                            // console.log("column == ", column)                   
                            return (
                                <Column {...rest} key={key} resizable>
                                    <CustomHeaderCell columnKey={key}>{label}</CustomHeaderCell>
                                    {/* { console.log("label == ", label)  } */}
                                    {/* {(key === "indian_exportar_name" || key === "foreign_importer_name") ? (                                          
                                        <Cell>
                                         {   console.log("key == ", key) }
                                            {rowData => {
                                            return (
                                                <>
                                                <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip className="show"> {`${rowData[key]}`}</Tooltip>}
                                                >     
                                                <span>                                               
                                                <a onClick={() => googleRedirect(rowData[key])}><i className="icon ion-ios-map"></i> </a> 
                                                </span>
                                                </OverlayTrigger>

                                                <OverlayTrigger
                                                placement="top"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip className="show"> {`${rowData[key]}`}</Tooltip>}
                                                >
                                                <span>
                                                    <a onClick={() => handleSaveContact(rowData[key])}><i className="icon ion-ios-save"></i> </a> |{' '}
                                                    {`${rowData[key]}`}
                                                </span>                                              
                                                </OverlayTrigger> 
                                                </>
                                            ); 
                                        }}</Cell>*/}
                                    {/* ) : ( */}
                                    <Cell dataKey={key}>
                                        {rowData => {
                                            return (<>
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip className="show"> {`${rowData[key]}`}</Tooltip>}
                                                >
                                                    <span>
                                                        {(key === "indian_exportar_name" || key === "foreign_importer_name") ? (
                                                            <>
                                                                <a onClick={() => googleRedirect(rowData[key])}><i className="icon ion-ios-map"></i> </a>
                                                                <a onClick={() => handleSaveContact(rowData[key])}><i className="icon ion-ios-save"></i> </a> |{' '}
                                                            </>) : null}
                                                        {`${rowData[key]}`}
                                                    </span>
                                                </OverlayTrigger>
                                            </>
                                            );
                                        }}
                                    </Cell>
                                    {/* )}   */}
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
                                limitOptions={[20, 30, 40, 50, 100, 200]}
                                limit={props.limit}
                                activePage={props.page}
                                onChangePage={props.setPage}
                                onChangeLimit={props.handleChangeLimit}
                            />
                        </div>
                    ) : null}
                </div>

                <div>
                    {rowDataModal ?
                        <Modal className="" bssize="md"
                            show={showModal}
                            onHide={handleModalClose}
                        >
                            <Modal.Header closeButton > Description </Modal.Header>
                            <Modal.Title >  </Modal.Title>

                            <Modal.Body style={{ height: '80vh', overflow: 'auto', scrollbarWidth: '10px' }}>
                                <div>
                                    {Object.keys(rowDataModal).map((item, index) => (
                                        columnListExportDashboard.map((val, i) => (
                                            <div key={index + i}>
                                                {rowDataModal[item] != null && val.key == item ? <p ref={nodeRef}><b>{val.label}:</b> {rowDataModal[item]}</p> : null}
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </Modal.Body>

                        </Modal>
                        : null}
                </div>

                <Modal size="lg" show={showFilterModal} onHide={() => setShowFilterModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Filter by {filterColumn}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* <MultiSelect
                            options={filterOptions}
                            value={selectedOptions}
                            onChange={setSelectedOptions}
                            labelledBy="Select"
                        /> */}

                        <DataTableCoulumnFilter data={filterOptions} />
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button onClick={handleApplyFilter} variant="primary">Apply</Button> */}
                        <Button onClick={() => setShowFilterModal(false)} variant="secondary">Cancel</Button>
                    </Modal.Footer>
                </Modal>

                <DataTableCoutryFilterModal
                    show={countryModal}
                    filterCountryList={props.filterCountryList}
                    handleClose={() => setCountryModal(false)}
                >
                </DataTableCoutryFilterModal>
            </div>

        </>
    );

}