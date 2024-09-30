import React from 'react';
import moment from 'moment/min/moment-with-locales';
import { colors } from "../components/Theme/WebTheme";
import {
    Typography,
    TextField,
    Grid,
    Modal,
    Button,
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Switch
} from '@mui/material';
import { useTranslation } from "react-i18next";
import OtherPerson from 'components/OtherPerson';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
export const calcEst = true;
export const showEst = false;
export const optionsRequired = false;

export const MAIN_COLOR = colors.BIDTAXIPRIMARY;
export const SECONDORY_COLOR = colors.BIDTAXISECONDORY;

export const FONT_FAMILY =  '"Roboto", "Helvetica", "Arial", sans-serif';

export const bookingHistoryColumns = (role, settings, t, isRTL) => [
    { title: t('booking_ref'), field: 'reference'},
    { title: t('booking_date'), field: 'bookingDate', render: rowData => rowData.bookingDate?moment(rowData.bookingDate).format('lll'):null},
    { title: t('car_type'), field: 'carType'},
    { title: t('assign_driver'), field: 'driver_name'},
    { title: t('booking_status_web'), field: 'status',
   render: rowData => 
  <div
  style={{backgroundColor:rowData.status === "CANCELLED"?colors.RED :rowData.status=== "COMPLETE"?colors.GREEN : colors.YELLOW, color:"white", padding:7, borderRadius:"15px", fontWeight:"bold", width:"150px", margin: 'auto' }}
  >{t(rowData.status)}</div>,  },
    { title: t('otp'), field: 'otp',  render: rowData => <div>{rowData.otp ? t("true") : t("false")}</div> },
    { title: t('trip_cost'), field: 'trip_cost',
    render: (rowData) =>
    rowData.trip_cost
    ? settings.swipe_symbol
    ? rowData.trip_cost + " " + settings.symbol
    : settings.symbol + " " + rowData.trip_cost
  : settings.swipe_symbol
    ? "0 " + settings.symbol
    : settings.symbol + " 0",
   },
];

export const BookingModalBody = (props) => {
    const { t, i18n  } = useTranslation();
    const isRTL = i18n.dir();
    const { classes, tripInstructions, handleChange, roundTrip, auth, profileData, instructionData, otherPerson, setOtherPerson, offerFare, estimate, minimumPrice, settings } = props;
    return (
        <Grid item xs={12}>
        <span>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{textAlign:isRTL==='rtl'?'right':'left'}}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
              { <Typography style={{fontFamily:FONT_FAMILY}}>{t('roundTrip')}</Typography>}
                </FormLabel>
              <RadioGroup name="roundTrip" value={roundTrip} onChange={handleChange}>
                  <FormControlLabel key={"key0"} value={0} control={<Radio />} label={ <Typography style={{fontFamily:FONT_FAMILY}}>{t('no')}</Typography>} />
                  <FormControlLabel key={"key1"} value={1} control={<Radio />} label={ <Typography style={{fontFamily:FONT_FAMILY}}>{t('yes')}</Typography>} />
              </RadioGroup>
            </FormControl>
          </Grid>
          {auth.profile.usertype === 'customer' && !auth.profile.firstName ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.firstName ? false : true }
                fullWidth
                id="firstName"
                label={t('firstname')}
                name="firstName"
                autoComplete="firstName"
                onChange={handleChange}
                value={profileData.firstName}
                autoFocus
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.lastName ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.lastName ? false : true }
                fullWidth
                id="lastName"
                label={t('lastname')}
                name="lastName"
                autoComplete="lastName"
                onChange={handleChange}
                value={profileData.lastName}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }
            {auth.profile.usertype === 'customer' && !auth.profile.email ?
            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                required = {auth.profile.email ? false : true }
                fullWidth
                id="email"
                label={t('email')}
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={profileData.email}
                className={isRTL==='rtl'?classes.inputRtl:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            : null }

            <OtherPerson
              classes = {classes}
              otherPerson={otherPerson}
              handleChange={handleChange}
              setOtherPerson={setOtherPerson}
              instructionData={instructionData}
            />

            <Grid item xs={12}>
              <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                fullWidth
                id="tripInstructions"
                label={t('tripInstructions')}
                name="tripInstructions"
                autoComplete="tripInstructions"
                type="numeric"
                onChange={handleChange}
                value={tripInstructions}
                className={isRTL==='rtl'?[classes.inputRtl, classes.rightRty]:classes.textField}
                style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
              />
            </Grid>
            {settings && !settings.coustomerBidPrice ?
            <>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="offerFare"
                  label={t('offer_your_fare')}
                  name="offerFare"
                  autoComplete="offerFare"
                  type="numeric"
                  onChange={handleChange}
                  value={offerFare}
                  className={isRTL==='rtl'?[classes.inputRtl, classes.rightRty]:classes.textField}
                  style={{direction:isRTL==='rtl'?'rtl':'ltr'}}
                />
              </Grid>
              {parseFloat(minimumPrice) >= offerFare && offerFare > 0 ?   
                <Typography style={{fontFamily:FONT_FAMILY, color: colors.RED}}>{t('minimum_price')}: {minimumPrice}</Typography>
              : 
                <Typography style={{fontFamily:FONT_FAMILY}}>{t('recomendet_price')}: { estimate ? estimate.estimateFare : null}</Typography>
              }
            </> : null }
        </span>
        </Grid>
    )
}

export const validateBookingObj = (t, bookingObject, instructionData) => {
    return { bookingObject };
}

export const PanicSettings = (props) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { classes, data, handleTextChange } = props;
    return (
        <span>
            <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left', fontFamily:FONT_FAMILY }}>
                {t('panic_num')}
            </Typography>
            <TextField
                InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
                variant="outlined"
                margin="normal"
                fullWidth
                id="panic"
                label={t('panic_num')}
                className={isRTL === "rtl" ? [classes.rootRtl_1, classes.right] : classes.textField}
                name="panic"
                autoComplete="panic"
                onChange={handleTextChange}
                value={data.panic}
            />
        </span>
    )
}

export const DispatchSettings = (props) => {
    return null;
}

export const BookingImageSettings = (props) => {
    return null;
}

export const carTypeColumns = (t, isRTL, onClick) =>  [
  { title: t('name'), field: 'name', },
  { title: t('image'),  field: 'image',
    initialEditValue: 'https://cdn.pixabay.com/photo/2012/04/15/22/09/car-35502__480.png',
    render: rowData => rowData.image? <button onClick={()=>{onClick(rowData)}}><img alt='CarImage' src={rowData.image} style={{width: 50}}/></button>:null
  },
  { title: t('base_fare'), field: 'base_fare', type: 'numeric',  initialEditValue: 0 },
  { title: t('rate_per_unit_distance'), field: 'rate_per_unit_distance', type: 'numeric',  initialEditValue: 0},
  { title: t('rate_per_hour'), field: 'rate_per_hour', type: 'numeric',  initialEditValue: 0},
  { title: t('min_fare'), field: 'min_fare', type: 'numeric',  initialEditValue: 0},
  { title: t('convenience_fee'), field: 'convenience_fees', type: 'numeric', initialEditValue: 0},
  {
    title: t('convenience_fee_type'),
    field: 'convenience_fee_type',
    lookup: { flat: t('flat'), percentage: t('percentage')},
  },
  {
    title: t('fleet_admin_comission'), field: 'fleet_admin_fee', type: 'numeric', 
   initialEditValue: 0
  },
  { title: t('extra_info'), field: 'extra_info' , },
  { title: t('position'), field: 'pos', type: 'numeric', defaultSort:'asc'}
];


export const acceptBid = (selectedBooking, selectedBidder) => {
    let bookingObj = {...selectedBooking};
    bookingObj.selectedBid = bookingObj.driverOffers[selectedBidder];
    const uid = bookingObj.selectedBid.driver;
    for(let key in bookingObj.driverOffers){
      if(key !== uid){
         delete  bookingObj.driverOffers[key];
      }
    }
    for(let key in bookingObj.requestedDrivers){
        if(key !== uid){
          delete  bookingObj.requestedDrivers[key];
        }
    }
    return bookingObj;
}
  
export const BidModal = (props) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.dir();
    const { ref, role, selectedBooking, bidModalStatus,handleBidModalClose, classes, settings, acceptBid, selectedBidder, handleChange } = props;
    return selectedBooking && selectedBooking.driverOffers && role==='customer'?
    <Modal
         disablePortal
         disableEnforceFocus
         disableAutoFocus
         open={bidModalStatus}
         onClose={handleBidModalClose}
         className={classes.modal}
         container={() => ref}
    >
        <Grid container spacing={2} className={classes.paper}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormControl component="fieldset">
                <FormLabel component="legend" style={{textAlign:isRTL=== 'rtl' ?'right':'left', fontFamily:FONT_FAMILY}}>{t('payment')}</FormLabel>
                <RadioGroup name="selectedBidder" value={selectedBidder} onChange={handleChange}>
                {Object.keys(selectedBooking.driverOffers).map(key => 
                    <FormControlLabel 
                    key={key} value={key} control={<Radio />} 
                    label={ <Typography style={{fontFamily:FONT_FAMILY}}>{selectedBooking.driverOffers[key].driver_name + " - " + (settings.swipe_symbol===false?settings.symbol:"") + selectedBooking.driverOffers[key].trip_cost + (settings.swipe_symbol?settings.symbol:"")}</Typography>} 
                    /> 
                )}
                </RadioGroup>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}  style={{direction: isRTL=== 'rtl' ?'rtl' : 'ltr'}}>
            <Button onClick={handleBidModalClose} variant="contained" color="primary" style={{fontFamily:FONT_FAMILY}}>
            {t('cancel')}
            </Button>
            <Button variant="contained" color="primary" type="submit" style={{...(isRTL === 'rtl' ? {marginRight: 10} : {marginLeft: 10}), fontFamily: FONT_FAMILY }} onClick={acceptBid}>
             {t('selectBid')}
            </Button>
            </Grid>
        </Grid>
    </Modal>
     :null
}

export const  downloadCsv = (data, fileName) => {
    const finalFileName = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    a.setAttribute("download", finalFileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const DeliveryFlow = (props) => {
  return null
}

export const CustomerBidSettings = (props) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir();
  const { data, classes, handleSwitchChange, handleChangeBidPriceType, handleCustomerPrice } = props;
  return (
      <span>
        <Typography component="h1" variant="h5" style={{ marginTop: '15px', textAlign: isRTL === 'rtl' ? 'right' : 'left', fontFamily:FONT_FAMILY, marginBottom: 10 }}>
          {t('customer_initiate_bid_price_setting')}
        </Typography>

        <FormControlLabel
          style={{ marginLeft: '6px', marginBottom: '10px', flexDirection: isRTL === 'rtl' ? 'row-reverse' : 'row' }}
          control={
            <Switch
              checked={data.coustomerBidPrice}
              onChange={handleSwitchChange}
              name="coustomerBidPrice"
              color="primary"
            />
          }
          label={ <Typography className={classes.typography}>{t('disable_coustomerBidPrice')}</Typography>}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <FormControl
              fullWidth
              style={{ direction: isRTL === "rtl" ? "rtl" : "ltr", marginTop: 1 }}
            >
              <InputLabel
                id="coustomerBidPrice_type"
                className={isRTL === "rtl" ? classes.right : ""}
                sx={{ "&.Mui-focused": { color: MAIN_COLOR } }}
              >
                {<Typography className={classes.typography}>{t('coustomerBidPrice_type')}</Typography>}
              </InputLabel>
              <Select
                labelId="coustomerBidPrice_type"
                id="coustomerBidPrice_type"
                value={data?.coustomerBidPriceType || ""}
                label={t("coustomerBidPrice_type")}
                onChange={handleChangeBidPriceType}
                className={
                  isRTL === "rtl"
                    ? classes.selectField_rtl
                    : classes.selectField
                }
              >
                <MenuItem
                  style={{ direction: isRTL === "rtl" ? "rtl" : "ltr" }}
                  value={"percentage"}
                >
                  {<Typography className={classes.typography}>{t('percentage')}</Typography>}
                </MenuItem>
                <MenuItem
                  style={{ direction: isRTL === "rtl" ? "rtl" : "ltr" }}
                  value={"flat"}
                >
                  {<Typography className={classes.typography}>{t('flat')}</Typography>}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>                  
            <TextField
              InputLabelProps={{ style: { fontFamily: FONT_FAMILY } }}
              className={isRTL === "rtl" ? classes.rootRtl : classes.textField}
              variant="outlined"
              // /margin="normal"
              fullWidth
              id="bidprice"
              label={t('bid_lower_price')}
              name="bidprice"
              autoComplete="bidprice"
              onChange={handleCustomerPrice}
              value={data.bidprice}
            />
          </Grid>
        </Grid>
      </span>
  )
}