import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import * as actions from "../actions/dCandidate";
import { Button, ButtonGroup, Grid,Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, } from "@mui/material";
import DCandidateForm from "./DCandidateForm";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const DCandidates=(props)=>{
    useEffect(()=>{
        props.fetchAllDCandidates();
    },[])
    const [currentId,setCurrentId]=useState(0);
    const onDelete=id=> {
        if(window.confirm("Are you sure you want to delete?")){
            props.deleteDCandidates(id);
        }
    }
    return(
        <Paper sx={{margin: 2,
            padding: 2,}}
            elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({currentId,setCurrentId})}></DCandidateForm>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "1.25rem"}}>Name</TableCell>
                                    <TableCell sx={{ fontSize: "1.25rem"}}>Mobile</TableCell>
                                    <TableCell sx={{ fontSize: "1.25rem"}}>Blood Group</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidatelist?.map((record,index)=>{
                                        return(<TableRow key={index} hover>
                                            <TableCell>{record.fullName}</TableCell>
                                            <TableCell>{record.mobile}</TableCell>
                                            <TableCell>{record.bloodGroup}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button
                                                    onClick={()=>{setCurrentId(record.id)}}
                                                    ><EditIcon 
                                                    
                                                    color="primary"></EditIcon></Button>
                                                    <Button onClick={()=>onDelete(record.id)}><DeleteIcon color="secondary"></DeleteIcon></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
};


const mapStateToProps=state=>({
    dCandidatelist: state.dCandidate.list
})


const mapactionsToProps={
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidates:actions.Delete
}


export default connect(mapStateToProps,mapactionsToProps)((DCandidates));