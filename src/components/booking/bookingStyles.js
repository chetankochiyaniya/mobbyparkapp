import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    activeVehicle: {
        border: "1px solid #4169E1",
        zIndex: "2",
        marginRight: "35vw",
        "@media (min-width: 576px) and (max-width: 768px)": {
            marginRight: "15vw",
        },
    },
    activeTime: {
        border: "1px solid #4169E1",
        background: "#0000FF",
        color: "white",
        marginTop: "5px",
        display: "flex",
        margin: "5px",
    },
    p: {
        textAlign: "center",
    },
    container: {
        marginLeft: "10vw",
        marginRight: "50px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            maxWidth: "100%",
            marginLeft: "15vw",
        },
        "@media (max-width: 576px)": {
            marginLeft: "20vw",
        },
    },
    vehicles: {
        height: "100px",
        display: "flex",

        "@media (min-width: 576px) and (max-width: 768px)": {
            height: "80px",
        },
        "@media (max-width: 576px)": {
            height: "50px",
        },
    },
    bike: {
        padding: "5px",
        height: "80px",
        width: "80px",
        margin: "5px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            border: "0px groove",
            borderColor: "rgb(132, 187, 238)",
            padding: "10px",
            height: "80px",
            width: "80px",
            margin: "5px",
        },
        "@media (max-width: 576px)": {
            padding: "5px",
            height: "50px",
            width: "50px",
            margin: "3px",
        },
    },
    car: {
        padding: "5px",
        height: "75px",
        width: "80px",
        margin: "5px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            border: "0px groove",
            borderColor: "rgb(132, 187, 238)",
            padding: "10px",
            height: "80px",
            width: "80px",
            margin: "5px",
        },
        "@media (max-width: 576px)": {
            padding: "5px",
            height: "50px",
            width: "50px",
            margin: "3px",
        },
    },
    threeler: {
        padding: "5px",
        height: "80px",
        width: "80px",
        margin: "5px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            border: "0px groove",
            borderColor: "rgb(132, 187, 238)",
            padding: "10px",
            height: "80px",
            width: "80px",
            marginLeft: "1px",
        },
        "@media (max-width: 576px)": {
            padding: "5px",
            height: "50px",
            width: "50px",
            margin: "3px",
        },
    },
    van: {
        padding: "5px",
        height: "80px",
        width: "80px",
        margin: "5px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            border: "0px groove",
            borderColor: "rgb(132, 187, 238)",
            padding: "10px",
            height: "80px",
            width: "80px",
            margin: "5px",
        },
        "@media (max-width: 576px)": {
            padding: "5px",
            height: "50px",
            width: "50px",
            margin: "3px",
        },
    },
    bookings: {
        "@media (min-width: 576px) and (max-width: 768px)": {
            textAlign: "center",
        },
        "@media (max-width: 576px)": {
            textAlign: "center",
        },
    },
    truck: {
        padding: "5px",
        height: "80px",
        width: "80px",
        margin: "5px",
        "@media (min-width: 576px) and (max-width: 768px)": {
            border: "0px groove",
            borderColor: "rgb(132, 187, 238)",
            padding: "10px",
            height: "80px",
            width: "80px",
            margin: "5px",
        },
        "@media (max-width: 576px)": {
            padding: "5px",
            height: "50px",
            width: "50px",
            margin: "3px",
        },
    },

    formDetails: {
        paddingTop: "50px",
    },
    prices1: {
        display: "flex",
        marginLeft: "0.2vw",
    },
    prices2: {
        display: "flex",
    },
    amount: {
        backgroundColor: "rgb(69,39,164)",
        width: "23vw",
        height: "7vh",
        paddingTop: "9px",
        alignItems: "center",
        justifyContent: "center",
        "@media (min-width: 576px) and (max-width: 768px)": {
            paddingTop: "2vh",
            marginLeft: "18vw",
            height: "10vh",
            width: "40vw",
            textAlign: "center",
        },
        "@media (max-width: 576px)": {
            marginLeft: "0vw",
        },
    },
    ticket: {
        backgroundColor: "#28a745",
        width: "23vw",
        height: "7vh",
        paddingTop: "11px",
        alignItems: "center",
        justifyContent: "center",
        "@media (min-width: 576px) and (max-width: 768px)": {
            paddingTop: "2vh",
            marginLeft: "25vw",
        },
        "@media (max-width: 576px)": {
            marginLeft: "0vw",
        },
    },
    b6: {
        margin: "5px",
        padding: "5px",
        "&:hover": {
            backgroundColor: "rgb(86, 56, 255)",
        },
    },
    receipt: {
        width: "360px",
        height: "420px",
        padding: "12px 18px",
        paddingRight: "24px",
        borderRadius: "12px",
        top: "1.5em",
        fontFamily: "'Courier New', monospace",
        boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
        position: "relative",
    },
});
