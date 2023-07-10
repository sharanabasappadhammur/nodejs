import axios from "axios";
import tough from "tough-cookie"
import fetch from "node-fetch";
import express from "express"
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
    "KCZ-22 (DEC 22)",
    "KCH-23 (MAR 23)",
    "KCK-23 (MAY 23)"
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

api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
const authToken = 'yLcynWbLSIIX8SUAlvdcDxIPpLGDrs_Q3Bz2ZG47twomuhD5RYk4JB-P7YqGd_2WWtGVtAAxrbrcMSxTZNLKh_S3MIuJWw0X_HdW8KGbTBiBucewsWQgQ-qsR_xb3A8R-_vwN-JnMPguLt8RY3fCYagX3gT7WtKTeWc94lhzg_rwhb5bXRx3AC68b6bpNLEMEUgs9ii-FTI7T9kV9MW9bRKJwLW1WobV8az4fboUrzwNBxiAUXPXBzhLjUNj5KtJvhtQNeJbd11BG_pFVvqjT-dLbp9_GrETR1mzZzwYheLqi5rjzBujC8EcjCO04URL-eNxqCG31bPQWrRBck7VIiQ6RD5BoKyZF9PFLUQPeEAkla_AxKXXvGPjjqiG1jpHhU-zRTGv-2SGU9cbLMg1qKpz-dGfs3r_lrbrEILtKUTiN9rqRQ99lo1D0zkKq32DaGFVMilnaNhZfEXuzNnWvLGrwJ0WVzT2vZ7dPQezkDszloJNMtlIQ_896Wz9s_WzwlxikCze6-A1qGtm1AqBDLXp2xIMfg4DjjqlYjGv6clxnCjcvXY-YHDULfs27qTaYF2BkO29I9Kr7qOLWJEKX73smnFVrMoDNDZuBkDNdsWRUrCzenJVrsFgHaANedjBhcEIdphiWQfO203qjtlJIQ';
api.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

setInterval(()=>{
    getTincapheData()
},10000)

function getTincapheData(){
    api.post(endpoint)
    .then(response => {

        let robustaArray = []
        let arabicaArray = []
        let xeArray = []

        let ittirationForRobusta = 0
        let ittirationForArabica = 0
        let ittirationForXE = 0

        console.log('Response:', response.data.result);
        let newArray = response.data.result.map((ele, index) => {
            if (index >= 26 && index <= 30) {
            // if (index >= 41 && index <= 42) {
                const object = {
                    isHighlet: true,
                    id: 0,
                    createdBy: 1,
                    createdOn: "2023-07-08T06:41:51.810Z",
                    updatedBy: 1,
                    updatedDtms: "2023-07-08T06:41:51.810Z",
                    idMarket: 1,
                    contractName: robustaNameList[ittirationForRobusta],
                    lastChng: parseInt(ele.vs[1]),
                    chng: parseInt(ele.vs[2]),
                    percentageVal: ele.vs[3],
                    volume: parseInt(ele.vs[4]),
                    highRate: typeof ele.vs[6] == "string" ? parseInt(ele.vs[6].replace(",", "")) : ele.vs[6],
                    highRateCurrency: 0,
                    lowRate: typeof ele.vs[7] == "string" ? parseInt(ele.vs[7].replace(",", "")) : ele.vs[7],
                    lowRateCurrency: 0,
                    openRate: typeof ele.vs[8] == "string" ? parseInt(ele.vs[8].replace(",", "")) : ele.vs[8],
                    prevRate: typeof ele.vs[9] == "string" ? parseInt(ele.vs[9].replace(",", "")) : ele.vs[9],
                    openInterest: ele.vs[10],
                    bid: ele.vs[11],
                    bsize: ele.vs[12],
                    ask: ele.vs[13],
                    asize: ele.vs[14],
                    optionExpiry: "2023-07-08T06:41:51.810Z",
                    firstNoticeDate: "2023-07-08T06:41:51.810Z",
                    highCurrency: 0,
                    lowCurrency: 0,
                    marketName: robustaNameList[ittirationForRobusta],
                    userSymbolId: 0,
                    orderBy: 0
                }
                robustaArray.push(object)
                ittirationForRobusta += 1
            }
            if (index >= 4 && index <= 7) {
            // if (1==2) {
                const object = {
                    isHighlet: true,
                    id: 0,
                    createdBy: 1,
                    createdOn: "2023-07-08T06:41:51.810Z",
                    updatedBy: 1,
                    updatedDtms: "2023-07-08T06:41:51.810Z",
                    idMarket: 1,
                    contractName: arabicaNameList[ittirationForArabica],
                    lastChng: parseInt(ele.vs[1]),
                    chng: parseInt(ele.vs[2]),
                    percentageVal: ele.vs[3],
                    volume: parseInt(ele.vs[4]),
                    highRate: typeof ele.vs[6] == "string" ? parseInt(ele.vs[6].replace(",", "")) : ele.vs[6],
                    highRateCurrency: 0,
                    lowRate: typeof ele.vs[7] == "string" ? parseInt(ele.vs[7].replace(",", "")) : ele.vs[7],
                    lowRateCurrency: 0,
                    openRate: typeof ele.vs[8] == "string" ? parseInt(ele.vs[8].replace(",", "")) : ele.vs[8],
                    prevRate: typeof ele.vs[9] == "string" ? parseInt(ele.vs[9].replace(",", "")) : ele.vs[9],
                    openInterest: ele.vs[10],
                    bid: ele.vs[11],
                    bsize: ele.vs[12],
                    ask: ele.vs[13],
                    asize: ele.vs[14],
                    optionExpiry: "2023-07-08T06:41:51.810Z",
                    firstNoticeDate: "2023-07-08T06:41:51.810Z",
                    highCurrency: 0,
                    lowCurrency: 0,
                    marketName: arabicaNameList[ittirationForArabica],
                    userSymbolId: 0,
                    orderBy: 0
                }
                arabicaArray.push(object)
                ittirationForArabica += 1
            }
        });
        postDataToCoffeeWeb(robustaArray, arabicaArray)
        // console.log("Data From API", response.data)
    })
    .catch(error => {
        console.error('Error:', error.message);
        generateToken()
    });
}

let AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNDc0ODM2NDYiLCJuYmYiOjE2ODg5NjMzMTQsImV4cCI6MTY4OTU2ODExNCwiaWF0IjoxNjg4OTYzMzE0fQ.D2pcLJUZg1-O4FlUazIlb0gqRUNGt18HY9_jGyJvU6g"
function postDataToCoffeeWeb(robustaArray, arabicaArray) {
    let data = robustaArray.concat(arabicaArray);
    console.log("data",data)
    fetch('https://coffeeweb.org/api/TincapheAuth/PostTincapheMarketData', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${AuthToken}`,
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
            console.log(result);
        })
        .catch(error => {
            console.error("error", error);
        });
}

app.listen(process.env.PORT, async()=>{
    try{
        console.log("connected to server")
    }
    catch(error){
        console.log(error.message)
    }
})