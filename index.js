import axios from "axios";
import tough from "tough-cookie"
import fetch from "node-fetch";
import express, { response } from "express"
// const cron = require('node-cron');
import cron from 'node-cron'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
app.use(cors())
app.use(express.json())

const cookieJar = new tough.CookieJar();

let robustaDetails = [
    {
        contractName : "RCU-23 (SEP 23)",
        optionExpiry: "16-AUG-2023",
        firstNoticeDay: "25-AUG-2023",
    },
    {
        contractName : "RCX-23 (NOV 23)",
        optionExpiry: "19-OCT-2023",
        firstNoticeDay: "26-OCT-2023",
    },
    {
        contractName : "RCF-24 (JAN 24)",
        optionExpiry: "21-DEC-2023",
        firstNoticeDay: "22-DEC-2023",
    },
    {
        contractName : "RCH-24 (MAR 24)",
        optionExpiry: "15-FEB-2024",
        firstNoticeDay: "23-FEB-2024",
    },
    {
        contractName : "RCK-24 (MAY 24)",
        optionExpiry: "19-APR-2024",
        firstNoticeDay: "25-APR-2024",
    },
]

let arabicaDetails = [
    {
        contractName : "KCU-23 (SEP 23)",
        optionExpiry: "11-AUG-2023",
        firstNoticeDay: "23-AUG-2023",
    },
    {
        contractName : "KCZ-22 (DEC 23)",
        optionExpiry: "11-NOV-2023",
        firstNoticeDay: "21-NOV-2023",
    },
    {
        contractName : "KCH-23 (MAR 24)",
        optionExpiry: "09-FEB-2024",
        firstNoticeDay: "21-FEB-2024",
    },
    {
        contractName : "KCK-23 (MAY 24)",
        optionExpiry: "13-APR-2024",
        firstNoticeDay: "28-APR-2024",
    }
]

let xeNameDetails = [
    {
        id: 1,
        currencyName: "USD/INR",
        rowId: "49d26c9b-3f1b-44c0-877f-5c93355e0555"
    },
    // {
    //     id: 2,
    //     currencyName: "USD/VND",
    //     rowId: "39cf70bf-cd01-4092-ae37-bb29850f900b"
    // },
    // {
    //     id: 3,
    //     currencyName: "USD/BRL",
    //     rowId: "7ea02d36-55c0-4c43-b49e-f49e6703b5e3"
    // },
]

const api = axios.create({
    withCredentials: true,
    jar: cookieJar,
});

let payload = {
    grant_type: "password",
    client_id: "APP",
    usernameOrEmailAddress: "integrated",
    password: "welcome",
    tenancyName: "Default",
    rememberMe: false
}

let localAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNDc0ODM2NDYiLCJuYmYiOjE2ODk2NTk3NDMsImV4cCI6MTY5MDI2NDU0MywiaWF0IjoxNjg5NjU5NzQzfQ.Pa7qAUSF5U2a1SVn5M60CP-RtxkyvofER3cVBbjVSJM"

let generatedTokenForAuthenticate;
function Login() {
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.post("http://tincaphe.com//api/account/authenticate", payload)
        .then(response => {
            console.log("response...........", response?.data?.result?.access_token?.slice(0, 50))
            generatedTokenForAuthenticate = response?.data?.result?.access_token
        })
        .catch(error => {
            console.error('Error while logging in:', error.message);
        });
}


function Logout() {
    let currentTokenForLogout = generatedTokenForAuthenticate
    console.log("currentTokenForLogout..........", currentTokenForLogout?.slice(0, 50))
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${currentTokenForLogout}`;
    api.get("http://tincaphe.com//api/account/logout")
        .then(response => {
            console.log("Success Logout")
            Login()
        })
        .catch(error => {
            console.error('Error while logging out:', error.message);
        });
}

let rowIds = [
    "89ee81a5-a680-4207-ad25-6547d2ac9339",
    "a6225921-0804-4dc3-a15a-4967659abbda",
    "f0538d6e-a937-4820-a8a6-934e4dde5724",
    "7cf1c98d-b646-479d-924d-9155ee2da13f",
    "6acae6b3-a63a-4831-8cbc-298b132d5381",
    "2bf4396a-c63b-425d-b772-27c9691ada1f",
    "e83f088d-1d96-4ff8-b4d0-0eb35dcac720",
    "ad6789b9-b75c-43ac-8df7-14047fd376a2",
    "c06c6ac6-70e7-4aa5-80b9-622ae8c6f8ae",
]

function actualValue(value) {
    if (typeof value == "string") {
        if (value.includes(" ")) {
            return parseInt(value.replace(/[^\d]/g, "").slice(1))
        }
        else {
            // return value.replace(",", "")
            return parseFloat(value.replace(/,/g, '').replace(/s$/, ''))
        }
    }
    else {
        return value
    }
}

setInterval(() => {
    Logout()
}, 3600000)

setInterval(() => {
    getTincapheData()
}, 1000);

function getTincapheData() {
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post('http://tincaphe.com/api/services/app/priceTableClient/GetValues')
        .then(response => {

            let robustaArray = []
            let arabicaArray = []

            let ittirationForRobusta = 0
            let ittirationForArabica = 0

            for (let i = 0; i < rowIds.length; i++) {
                let targetedObject = response.data.result.find((ele) => rowIds[i] === ele.id)

                if (i <= 4) {
                    const currentDate = new Date();
                    const targetDateForOEForRobusta = new Date(robustaDetails[ittirationForRobusta].optionExpiry);
                    const targetDateFNRForRobusta = new Date(robustaDetails[ittirationForRobusta].firstNoticeDay);
                    const timeDifferenceForRobustaOE = targetDateForOEForRobusta - currentDate;
                    const timeDifferenceForRobustaFN = targetDateFNRForRobusta - currentDate;
                    const differenceInDaysForRobustaOE = Math.floor(timeDifferenceForRobustaOE / (1000 * 60 * 60 * 24));
                    const differenceInDaysForRobustaFN = Math.floor(timeDifferenceForRobustaFN / (1000 * 60 * 60 * 24));
                    let optionExpiryStatusForRubusta = () => {
                        if (differenceInDaysForRobustaOE < 10 && differenceInDaysForRobustaOE >= -1) {
                            return "boldAndRed"
                        }

                        else if ((currentDate > targetDateForOEForRobusta) && (currentDate < targetDateFNRForRobusta)) {
                            return "expired"
                        }
                    }
                    let firstNoticeDayStatusForRubusta = () => {
                        if (differenceInDaysForRobustaFN < 10 && differenceInDaysForRobustaFN >= -1) {
                            return "boldAndRed"
                        }
                        else if((currentDate > targetDateForOEForRobusta) && (currentDate < targetDateFNRForRobusta)){
                            return "boldAndBlack"
                        }
                        else if (differenceInDaysForRobustaOE < 10 && differenceInDaysForRobustaOE >= 0) {
                            return "boldAndBlack"
                        }
                    }
                    const object = {
                        isHighlight: 0,
                        id: ittirationForRobusta,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: new Date(),
                        idMarket: 1,
                        contractName: robustaDetails[ittirationForRobusta].contractName,
                        lastChng: actualValue(targetedObject.vs[1]),
                        chng: actualValue(targetedObject.vs[2]),
                        percentageVal: actualValue(targetedObject.vs[3]),
                        volume: actualValue(targetedObject.vs[4]),
                        highRate: actualValue(targetedObject.vs[6]),
                        highRateCurrency: 0,
                        lowRate: actualValue(targetedObject.vs[7]),
                        lowRateCurrency: 0,
                        openRate: actualValue(targetedObject.vs[8]),
                        prevRate: actualValue(targetedObject.vs[9]),
                        openInterest: targetedObject.vs[10],
                        bid: targetedObject.vs[11],
                        bsize: targetedObject.vs[12],
                        ask: targetedObject.vs[13],
                        asize: targetedObject.vs[14],
                        optionExpiry: robustaDetails[ittirationForRobusta].optionExpiry,
                        optionExpiryStatus: optionExpiryStatusForRubusta(),
                        firstNoticeDate: robustaDetails[ittirationForRobusta].firstNoticeDay,
                        firstNoticeDateStatus: firstNoticeDayStatusForRubusta(),
                        highCurrency: 0,
                        lowCurrency: 0,
                        marketName: robustaDetails[ittirationForRobusta].contractName,
                        userSymbolId: 0,
                        orderBy: 0
                    }
                    robustaArray.push(object)
                    ittirationForRobusta += 1
                }
                else {
                    const currentDate = new Date();
                    const targetDateForOEForArabica = new Date(arabicaDetails[ittirationForArabica].optionExpiry);
                    const targetDateFNRForArabica = new Date(arabicaDetails[ittirationForArabica].firstNoticeDay);
                    const timeDifferenceForArabicaOE = targetDateForOEForArabica - currentDate;
                    const timeDifferenceForArabicaFN = targetDateFNRForArabica - currentDate;
                    const differenceInDaysForArabicaOE = Math.floor(timeDifferenceForArabicaOE / (1000 * 60 * 60 * 24));
                    const differenceInDaysForArabicaFN = Math.floor(timeDifferenceForArabicaFN / (1000 * 60 * 60 * 24));
                    let optionExpiryStatusForArabica = () => {
                        if (differenceInDaysForArabicaOE <= 10 && differenceInDaysForArabicaOE >= -1) {
                            return "boldAndRed"
                        }

                        else if ((currentDate > targetDateForOEForArabica) && (currentDate < targetDateFNRForArabica)) {
                            return "expired"
                        }
                    }
                    let firstNoticeDayStatusForArabica = () => {
                        if (differenceInDaysForArabicaFN <= 10 && differenceInDaysForArabicaFN >= -1) {
                            return "boldAndRed"
                        }
                        else if((currentDate > targetDateForOEForArabica) && (currentDate < targetDateFNRForArabica)){
                            return "boldAndBlack"
                        }
                        else if (differenceInDaysForArabicaOE <= 10 && differenceInDaysForArabicaOE >= -1) {
                            return "boldAndBlack"
                        }
                    }
                    const object = {
                        isHighlight: 0,
                        id: ittirationForArabica,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: new Date(),
                        idMarket: 2,
                        contractName: arabicaDetails[ittirationForArabica].contractName,
                        lastChng: actualValue(targetedObject.vs[1]),
                        chng: actualValue(targetedObject.vs[2]),
                        percentageVal: actualValue(targetedObject.vs[3]),
                        volume: actualValue(targetedObject.vs[4]),
                        highRate: actualValue(targetedObject.vs[6]),
                        highRateCurrency: 0,
                        lowRate: actualValue(targetedObject.vs[7]),
                        lowRateCurrency: 0,
                        openRate: actualValue(targetedObject.vs[8]),
                        prevRate: actualValue(targetedObject.vs[9]),
                        openInterest: actualValue(targetedObject.vs[10]),
                        bid: actualValue(targetedObject.vs[11]),
                        bsize: actualValue(targetedObject.vs[12]),
                        ask: actualValue(targetedObject.vs[13]),
                        asize: actualValue(targetedObject.vs[14]),
                        optionExpiry: arabicaDetails[ittirationForArabica].optionExpiry,
                        optionExpiryStatus: optionExpiryStatusForArabica(),
                        firstNoticeDate: arabicaDetails[ittirationForArabica].firstNoticeDay,
                        firstNoticeDateStatus: firstNoticeDayStatusForArabica(),
                        highCurrency: 0,
                        lowCurrency: 0,
                        marketName: arabicaDetails[ittirationForArabica].contractName,
                        userSymbolId: 0,
                        orderBy: 0
                    }
                    arabicaArray.push(object)
                    ittirationForArabica += 1
                }
            }
            postDataToCoffeeWeb(robustaArray, arabicaArray)
            console.log("getting data from tincaphe")
        })
        .catch(error => {
            console.error('Error while fetching data:', error.message);
            Login()
        });
}

function postDataToCoffeeWeb(robustaArray, arabicaArray) {
    let data = robustaArray.concat(arabicaArray);
    // console.log(data)
    fetch('https://coffeeweb.org/api/TincapheAuth/InsertTincapheData', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localAuthToken}`,
            accept: "application/json",
            "accept-language": "en_US",
            "content-type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            return response.json();
        })
        .then(result => {
            console.log("done")
        })
        .catch(error => {
            console.error("error", error);
        });
}

setInterval(() => {
    getXECurrencyData()
}, 10000);

function getXECurrencyData() {
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post('http://tincaphe.com/api/services/app/priceTableClient/GetValues')
        .then(response => {

            let xeArray = []
            let ittirationForXE = 0

            for (let i = 0; i < xeNameDetails.length; i++) {
                let targetedObject = response.data.result.find((ele) => ele.id === xeNameDetails[i].rowId)

                const object = {
                    currencyName: xeNameDetails[ittirationForXE].currencyName,
                    last: actualValue(targetedObject.vs[1]),
                    chng: targetedObject.vs[2],
                    percentageVal: targetedObject.vs[3],
                }

                xeArray.push(object)
                ittirationForXE += 1
            }
            postXECurrencyData(xeArray)
            // console.log("getting XE data from tincaphe",xeArray)
        })
        .catch(error => {
            console.error('Error while fetching data:', error.message);
            // Login()
        });
}

function postXECurrencyData(xeArray) {
    // console.log("getting XE data from tincaphe", xeArray)
    fetch('https://coffeeweb.org/api/CoffeeQuotesCurrency/PostcoffeequotesCurrency', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localAuthToken}`,
            accept: "application/json",
            "accept-language": "en_US",
            "content-type": "application/json",
        },
        body: JSON.stringify(xeArray)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            return response.json();
        })
        .then(result => {
            console.log("XE done")
        })
        .catch(error => {
            console.error("error", error);
        });
}



app.listen(process.env.PORT, async () => {
    try {
        console.log("connected to server")
    }
    catch (error) {
        console.log(error.message)
    }
})


