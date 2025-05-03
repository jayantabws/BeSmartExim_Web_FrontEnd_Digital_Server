import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import AxiosUser from "../shared/AxiosUser";
import Swal from 'sweetalert2';
import axios from 'axios';
import {updateSubscriptionCount, updateDownloadArrayCount, setCountryList, setDataAccessDate,setDloadCountSubuser,setUplineId} from "../store/actions/data"
import { connect } from "react-redux";
import { loaderStart, loaderStop } from "../store/actions/loader";
import Loader from "../components/Loader"
import AxiosMaster from "../shared/AxiosMaster";

const initialValues = {
  email: "",
  password: ""
};
const validateForm = Yup.object().shape({
  email: Yup.string().email().required("Please enter valid email address"),
  password: Yup.string().required("Please enter password")
});

const Login = (props) => {

  const [ip, setIp] = useState([]);
  const [isMaintenance, setIsMaintenance] = useState("");

  const history = useHistory();

  const handleSubmit = (values) => {
    console.log("Values", values);
    props.loadingStart()
    const postData = {
      "email": values.email,
      "password": values.password,
      "ipaddress": ip
    }
    AxiosUser({
      method: "POST",
      url: `/user-management/login`,
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("user", res.data);
        props.loadingStop()
        if(res.data.userid){
          localStorage.setItem("user",JSON.stringify(res.data));
          localStorage.setItem("userToken", res.data.userid);
          sessionStorage.setItem("userToken", res.data.userid);
          localStorage.setItem("sessionID", res.data.sessionId);        
          history.push("/dashboard");

          // if(res.data.uplineId != 0){
          //   props.setDloadCountSubuser(
          //   {download_count_subUser: res.data.downloadLimit,
          //     }) 
          // }
          props.setUplineId(
            {uplineId: res.data.uplineId,
              }) 
         // window.location.reload(true)
        } else {
          Swal.fire({
            title: 'Oops!',
            text: 'Invalid login, please try again.',
            icon: 'error',
          })
        }
      })
      .catch(err => {
        console.log("Err");
        props.loadingStop()
        Swal.fire({
          title: 'Oops!',
          text: err.data.errorMsg,
          icon: 'error',
        })
      });
  }

  const getData = () => {
    const res = axios.get("https://api.ipify.org/?format=json").then(res => {
      setIp(res.data.ip);    
    });
    
  };

  const checkMaintenance = () => {
    let postData = {}
    AxiosMaster({
      method: "POST",
      url: `/masterdata-management/sitesettings`,
      data: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res.data)
      if(res.data.settingsList[0].isMaintanance == "Y"){
        setIsMaintenance(res.data.settingsList[0].isMaintanance)
        props.history.push({
          pathname : "/maintenance",
          state:{
            data: res.data.settingsList[0].siteMessage
          }
        });
      }
    })
  }

  useEffect(()=>{
    getData()
    checkMaintenance()
    props.loadingStop()
    const userToken = sessionStorage.getItem("userToken") && localStorage.getItem("sessionID");
    if(userToken){
      history.push("/dashboard");
    }

  },[])

  return (
    <>
    {isMaintenance != "Y" || isMaintenance != "" ?
    <div className="login-body">

      <div className="d-flex justify-content-right">
      <div className="logint-left">
        <div class="logint-Left">
        <h2>BE2.0 Supply Chain Intelligence</h2>
        <p>
        BE2.0, being a cutting-edge trade intelligence, is a data-driven platform that enables you to make the impactful business decision. With the provisions of hassle-free, practical and convenient tools, BE2.0 gives you the accessibility of an efficacious monitor of export-oriented, import-oriented or both kind of companies' cargo movement across the globe. 
        </p> <p>
        Visualize and map the international market with millions of records with BE2.0 to leverage the competitive edge that equips you with the tools to identify the various correlations, demand-supply trends and relations, useful forecasting, etc.

        </p>
<div>
<h5>Find Us On</h5>
  <ul class="social">
  <li class="facebook"></li>
  <li class="instagram"></li>
    <li class="linkedin"></li>
  </ul>
</div>
           </div>
        </div>
        <div className="login-img">
          {/*<img src={'img/login.jpg'} alt="logo" />*/}
        </div>
        <div className="form-access logint">
          <Formik
            initialValues={initialValues}
            validationSchema={validateForm}
            onSubmit={handleSubmit}
          >
            {({ values, errors, setFieldValue, setFieldError, touched, isValid, handleSubmit, submitForm }) => {
              return (
                <Form>
                  <div class="text-center"><img src={'img/logo.png'} alt="logo" width={'116'} height={'135'}/></div>
                  
                  <span>Sign In</span>
                  <div className="form-group">
                    <Field
                      name="email"
                      type="text"
                      className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
                      placeholder="Email Address"
                      onChange={event => {
                        setFieldValue("email", event.target.value);
                      }}
                    />
                    {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
                  </div>
                  <div className="form-group">
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                      placeholder="Password"
                      onChange={event => {
                        setFieldValue("password", event.target.value);
                      }}
                    />
                    {touched.password && errors.password && (<p className="error">{errors.password}</p>)}
                  </div>
                  <div className="text-right">
                    <Link to="/reset">Forgot Password?</Link>
                  </div>
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="form-checkbox"
                    />
                    <label className="custom-control-label" htmlFor="form-checkbox">
                      Remember me
                    </label>
                  </div>
                  <button type="submit" onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                  }} className="btn btn-primary">Sign In</button>
                </Form>
              )
            }
            }
          </Formik>
          <h2>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </h2>
        </div>
      </div>
      {props.loading ? (
           <Loader/>    
      ) : null}
      </div> : null }
    </>
  );
}
const mapDispatchToProps = dispatch => {
  return {
      updateSubscriptionCount: (data) => dispatch(updateSubscriptionCount(data)), 
      updateDownloadArrayCount: (data) => dispatch(updateDownloadArrayCount(data)),
      setCountryList: (data) => dispatch(setCountryList(data)),
      setDataAccessDate: (data) => dispatch(setDataAccessDate(data)),
      setDloadCountSubuser: (data) => dispatch(setDloadCountSubuser(data)), 
      loadingStart: () => dispatch(loaderStart()),
      loadingStop: () => dispatch(loaderStop()),
      setUplineId: (data) => dispatch(setUplineId(data)), 
      
  }
}

const mapStateToProps = state => {
  return {
      loading: state.loader.loading,
      download_count: state.data.download_count,
      subscriptionId: state.data.subscriptionId,
      dataAccess_count: state.data.dataAccess_count,
      totalWorkspace: state.data.totalWorkspace,
      subUserCount: state.data.subUserCount,
      queryPerDay: state.data.queryPerDay,
      downloadArray: state.data.downloadArray,
      download_count_subUser: state.data.download_count_subUser,
      uplineId: state.data.uplineId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);