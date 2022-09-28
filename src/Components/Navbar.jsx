import React from "react";
import { AppBar, Toolbar, CssBaseline, Typography } from "@mui/material"; 
import { styled } from '@mui/material/styles';
import { StyledLink } from "../StyledComponents/StyledLink";

const StyledNavLinks = styled('div')({
    display: "flex",
})
const StyledTypography = styled(Typography)({
    flexGrow: "1",
    "&hover": {
        cursor: "default    ",
    },  
})


export class Navbar extends React.Component {

    render() {
        return (
            <AppBar position="static">
                <CssBaseline/>
                <Toolbar>
                    <StyledTypography variant="h4">
                        Navigacija
                    </StyledTypography>
                    <StyledNavLinks >
                        <StyledLink to="/map">
                            Map
                        </StyledLink>
                        {/*StyledLink to="/map" text="Map" />
                        <StyledLink to="/data" text="Data"/>*/}
                        <StyledLink to="/data">
                            Data
                        </StyledLink>
                    </StyledNavLinks>
                </Toolbar>
            </AppBar>
        );
    }
}
