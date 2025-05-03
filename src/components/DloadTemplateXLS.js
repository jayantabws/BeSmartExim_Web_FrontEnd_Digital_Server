import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {columnListImportDownloadIND,columnListExportDownloadIND,columnListImportDownloadUSA,columnListImportDownloadForeign,columnListExportDownloadUSA,columnListExportDownloadForeign} from "../shared/TradeColumnList"

const DloadTemplateXLS = (props) => {

    let Columns = []
    let columnListImportDownload = props.countryCode ==  "IND" || props.countryCode ==  "SEZ" ? columnListImportDownloadIND : props.countryCode ==  "USA" ? columnListImportDownloadUSA : columnListImportDownloadForeign
    let columnListExportDownload = props.countryCode ==  "IND" || props.countryCode ==  "SEZ" ? columnListExportDownloadIND : props.countryCode ==  "USA" ? columnListExportDownloadUSA : columnListExportDownloadForeign
    Columns = Object.keys(props.filteredArray && props.filteredArray.length > 0 && props.filteredArray[0])

    let defaultColumns = []
    if(props.tradeType == "I"){
        columnListImportDownload.map((item,index) => {
            if( Columns.includes(item.key) ){
                defaultColumns.push(item)
                
            }         
        })
    }
    else{
        columnListExportDownload.map((item,index) => {
            if( Columns.includes(item.key) ){
                defaultColumns.push(item)
                
            }         
        })
    }
    
    

    return (
        <>
            <table >
                <thead style={{background: "yellow"}}>
                    <tr> 
                    { defaultColumns && defaultColumns.length > 0 && defaultColumns.map((item,index)=> {
                        return(<th>{item.label}</th>)                     
                    })}                                                                   
                    </tr>
                </thead>
                <tbody>
                    {
                        props && props.filteredArray.map((item, index) => {
                            return(
                            <tr key={index}>
                                {defaultColumns.map((subItem,subIndex)=> {   
                                    return(<td key = {subIndex+"a"}>{item[subItem.key]}</td>)          
                                })}
                            </tr>
                            )
                            
                            
                        }
                    ) 
                }
                </tbody> 
            </table>
        </>
    )
}

export default DloadTemplateXLS;
