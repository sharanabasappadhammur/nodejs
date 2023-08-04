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

let robustaNameList = [
    // "RCN-23 (JUL 23)",
    "RCU-23 (SEP 23)",
    "RCX-23 (NOV 23)",
    "RCF-24 (JAN 24)",
    "RCH-24 (MAR 24)",
    "RCK-24 (MAY 24)"
]
let arabicaNameList = [
    // "KCN-23 (Jul 23)",
    "KCU-23 (SEP 23)",
    "KCZ-22 (DEC 23)",
    "KCH-23 (MAR 24)",
    "KCK-23 (MAY 24)"
]
let optionExpiryForRobusta = [
    "16-AUG-2023",
    "19-OCT-2023",
    "21-DEC-2023",
    "15-FEB-2024",
    "19-APR-2024"
]
let firstNoticeDateForRobusta = [
    "25-AUG-2023",
    "26-OCT-2023",
    "23-DEC-2023",
    "23-FEB-2024",
    "25-APR-2024"
]
let optionExpiryForArabica = [
    "11-AUG-2023",
    "11-NOV-2023",
    "10-FEB-2024",
    "13-APR-2024",
]
let firstNoticeDateForArabica = [
    "23-AUG-2023",
    "21-NOV-2023",
    "17-FEB-2024",
    "28-APR-2024",
]

const endpoint = 'http://tincaphe.com/api/services/app/priceTableClient/GetValues';
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
// let payload = {
//     grant_type: "password",
//     client_id: "APP",
//     usernameOrEmailAddress: "integrated2",
//     password: "7979",
//     tenancyName: "Default",
//     rememberMe: false
// }

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

setInterval(() => {
    Logout()
}, 3600000)

setInterval(() => {
    getTincapheData()
}, 1000);

let robustaGlobalArray = []
let arabicaGlobalArray = []
let xeGlobalArray = []

let preCloseRobustaGlobalArray = []
let preCloseArabicaGlobalArray = []
let preCloseXeGlobalArray = []

function myFunction() {
    preCloseRobustaGlobalArray = robustaGlobalArray
    preCloseArabicaGlobalArray = arabicaGlobalArray
    console.log("This function runs daily at 1:29:50 PM!");
}

const currentTime = new Date();
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();

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

function getTincapheData() {
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post(endpoint)
        .then(response => {

            let robustaArray = []
            let arabicaArray = []
            let xeArray = []

            let ittirationForRobusta = 0
            let ittirationForArabica = 0
            let ittirationForXE = 0

            for (let i = 0; i < rowIds.length; i++) {
                let targetedObject = response.data.result.find((ele) => rowIds[i] === ele.id)
                let preCloseActualValue = () => {
                    if ((hour === 13 && minute >= 30) || (hour > 13 && hour < 22) || (hour === 22 && minute <= 30)) {
                        console.log("...........")
                        let preClose;
                        if (typeof targetedObject.vs[9] == "string") {
                            preClose = parseInt(targetedObject.vs[9].replace(",", ""))
                        } else {
                            preClose = targetedObject.vs[9]
                        }
                        console.log("preClose",preClose)
                        return preClose
                    }
                    else {
                        let preClose;
                        if (typeof targetedObject.vs[1] == "string" && typeof targetedObject.vs[2] == "string") {
                            preClose = parseInt(targetedObject.vs[1].replace(",", "")) - parseInt(targetedObject.vs[2].replace(",", ""))
                        } else {
                            preClose = targetedObject.vs[1] - targetedObject.vs[2]
                        }
                        return preClose
                    }
                }
                let optionExpiryStatusFnc = () => {
                    const targetDate = new Date(optionExpiryForRobusta[ittirationForRobusta]);
                    const currentDate = new Date();
                    const timeDifference = targetDate - currentDate;
                    const differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    if (differenceInDays <= 15) {
                        return "boldAndRed"
                    }
                    else if ((targetDate > currentDate) && (differenceInDays < 2)) {
                        return "recentlyExpired"
                    }

                }
                if (i <= 4) {
                    const object = {
                        isHighlight: 0,
                        id: ittirationForRobusta,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: new Date(),
                        idMarket: 1,
                        contractName: robustaNameList[ittirationForRobusta],
                        lastChng: parseInt(targetedObject.vs[1]),
                        chng: targetedObject.vs[2],
                        percentageVal: targetedObject.vs[3],
                        volume: typeof targetedObject.vs[4] == "string" ? parseInt(targetedObject.vs[4].replace(",", "")) : targetedObject.vs[4],
                        highRate: typeof targetedObject.vs[6] == "string" ? parseInt(targetedObject.vs[6].replace(",", "")) : targetedObject.vs[6],
                        highRateCurrency: 0,
                        lowRate: typeof targetedObject.vs[7] == "string" ? parseInt(targetedObject.vs[7].replace(",", "")) : targetedObject.vs[7],
                        lowRateCurrency: 0,
                        openRate: typeof targetedObject.vs[8] == "string" ? parseInt(targetedObject.vs[8].replace(",", "")) : targetedObject.vs[8],
                        prevRate: preCloseActualValue(),
                        openInterest: targetedObject.vs[10],
                        bid: targetedObject.vs[11],
                        bsize: targetedObject.vs[12],
                        ask: targetedObject.vs[13],
                        asize: targetedObject.vs[14],
                        optionExpiry: optionExpiryForRobusta[ittirationForRobusta],
                        optionExpiryStatus: optionExpiryStatusFnc(),
                        firstNoticeDate: firstNoticeDateForRobusta[ittirationForRobusta],
                        firstNoticeDateStatus: optionExpiryStatusFnc(),
                        highCurrency: 0,
                        lowCurrency: 0,
                        marketName: robustaNameList[ittirationForRobusta],
                        userSymbolId: 0,
                        orderBy: 0
                    }
                    robustaArray.push(object)
                    ittirationForRobusta += 1
                }
                else {
                    const object = {
                        isHighlight: 0,
                        id: ittirationForArabica,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: new Date(),
                        idMarket: 2,
                        contractName: arabicaNameList[ittirationForArabica],
                        lastChng: parseFloat(targetedObject.vs[1]),
                        chng: targetedObject.vs[2],
                        percentageVal: targetedObject.vs[3],
                        volume: typeof targetedObject.vs[4] == "string" ? parseInt(targetedObject.vs[4].replace(",", "")) : targetedObject.vs[4],
                        highRate: typeof targetedObject.vs[6] == "string" ? parseInt(targetedObject.vs[6].replace(",", "")) : targetedObject.vs[6],
                        highRateCurrency: 0,
                        lowRate: typeof targetedObject.vs[7] == "string" ? parseInt(targetedObject.vs[7].replace(",", "")) : targetedObject.vs[7],
                        lowRateCurrency: 0,
                        openRate: typeof targetedObject.vs[8] == "string" ? parseInt(targetedObject.vs[8].replace(",", "")) : targetedObject.vs[8],
                        prevRate: preCloseActualValue(),
                        openInterest: targetedObject.vs[10],
                        bid: targetedObject.vs[11],
                        bsize: targetedObject.vs[12],
                        ask: targetedObject.vs[13],
                        asize: targetedObject.vs[14],
                        optionExpiry: optionExpiryForArabica[ittirationForArabica],
                        optionExpiryStatus: optionExpiryStatusFnc(),
                        firstNoticeDate: firstNoticeDateForArabica[ittirationForArabica],
                        firstNoticeDateStatus: optionExpiryStatusFnc(),
                        highCurrency: 0,
                        lowCurrency: 0,
                        marketName: arabicaNameList[ittirationForArabica],
                        userSymbolId: 0,
                        orderBy: 0
                    }
                    arabicaArray.push(object)
                    ittirationForArabica += 1
                }
            }
            postDataToCoffeeWeb(robustaArray, arabicaArray)
            // console.log("getting data from tincaphe")
        })
        .catch(error => {
            console.error('Error while fetching data:', error.message);
            Login()
        });
}

function postDataToCoffeeWeb(robustaArray, arabicaArray) {
    let data = robustaArray.concat(arabicaArray);
    robustaGlobalArray = robustaArray
    arabicaGlobalArray = arabicaArray
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

app.listen(process.env.PORT, async () => {
    try {
        console.log("connected to server")
    }
    catch (error) {
        console.log(error.message)
    }
})