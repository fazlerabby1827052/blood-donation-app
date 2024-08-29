import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
} from "@mui/material";
import * as actions from "../actions/dCandidate";
import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";

const initialFieldValues = {
  fullName: "",
  mobile: "",
  email: "",
  age: "",
  bloodGroup: "",
  address: "",
};

const DCandidateForm = (props) => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    if ("bloodGroup" in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (props.currentId === 0) {
        props.createDCandidate(values, () => {
          window.alert("inserted");
        });
      } else {
        props.updateDCandidate(props.currentId, values, () => {
          window.alert("updated.");
        });
      }
    }
  };
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.dCandidateList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  const { values, errors, setErrors, setValues, handleInputChange,resetForm } = useForm(
    initialFieldValues,
    validate,props.setCurrentId,
  );
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
      style={{ margin: "16px 0" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            value={values.fullName}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
            label="Full Name"
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          />

          <TextField
            name="email"
            sx={{ mb: 2 }}
            variant="outlined"
            value={values.email}
            fullWidth
            onChange={handleInputChange}
            label="Email"
            {...(errors.email && { error: true, helperText: errors.email })}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl {...(errors.bloodGroup && { error: true })} fullWidth>
              <InputLabel id="demo-simple-select-label">BloodGroup</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="bloodGroup"
                value={values.bloodGroup}
                label="Blood Group"
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Blood Group</MenuItem>
                <MenuItem value="A+">A +ve</MenuItem>
                <MenuItem value="A-">A -ve</MenuItem>
                <MenuItem value="B+">B +ve</MenuItem>
                <MenuItem value="B-">B -ve</MenuItem>
                <MenuItem value="AB+">AB +ve</MenuItem>
                <MenuItem value="AB-">AB -ve</MenuItem>
                <MenuItem value="O+">O +ve</MenuItem>

                <MenuItem value="O-">O -ve</MenuItem>
              </Select>
              {errors.bloodGroup && (
                <FormHelperText>{errors.bloodGroup}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
            sx={{ mb: 2 }}
            variant="outlined"
            value={values.mobile}
            onChange={handleInputChange}
            fullWidth
            label="Mobile"
          />
          <TextField
            sx={{ mb: 2 }}
            name="age"
            variant="outlined"
            value={values.age}
            fullWidth
            onChange={handleInputChange}
            label="Age"
          />
          <TextField
            name="address"
            fullWidth
            variant="outlined"
            value={values.address}
            onChange={handleInputChange}
            label="Address"
            sx={{ mb: 2 }}
          />
          <div>
            <Button
              sx={{ m: 1 }}
              variant="contained"
              type="submit"
              color="primary"
            >
              Submit
            </Button>
            <Button onClick={resetForm} variant="contained">Reset</Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(DCandidateForm);
