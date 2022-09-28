import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
export const StyledLink = styled(Link)(({ theme }) => {
    return ({
        TextDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        "&:hover": {
            color: 'yellow',
            borderBottom: '1px solid white',
        },
    })
}
);  
