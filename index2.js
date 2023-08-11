// import axios from "axios";
// import tough from "tough-cookie"
// import fetch from "node-fetch";
// import express, { response } from "express"
// // const cron = require('node-cron');
// import cron from 'node-cron'
// const app = express()
// import dotenv from 'dotenv'
// dotenv.config()
// import cors from 'cors'
// app.use(cors())
// app.use(express.json())

// const cookieJar = new tough.CookieJar();

// let robustaNameList = [
//     // "RCN-23 (JUL 23)",
//     "RCU-23 (SEP 23)",
//     "RCX-23 (NOV 23)",
//     "RCF-24 (JAN 24)",
//     "RCH-24 (MAR 24)",
//     "RCK-24 (MAY 24)"
// ]
// let arabicaNameList = [
//     // "KCN-23 (Jul 23)",
//     "KCU-23 (SEP 23)",
//     "KCZ-22 (DEC 23)",
//     "KCH-23 (MAR 24)",
//     "KCK-23 (MAY 24)"
// ]
// let optionExpiryForRobusta = [
//     "16-AUG-2023",
//     "19-OCT-2023",
//     "21-DEC-2023",
//     "15-FEB-2024",
//     "19-APR-2024"
// ]
// let firstNoticeDateForRobusta = [
//     "25-AUG-2023",
//     "26-OCT-2023",
//     "23-DEC-2023",
//     "23-FEB-2024",
//     "25-APR-2024"
// ]
// let optionExpiryForArabica = [
//     "11-AUG-2023",
//     "11-NOV-2023",
//     "10-FEB-2024",
//     "13-APR-2024",
// ]
// let firstNoticeDateForArabica = [
//     "23-AUG-2023",
//     "21-NOV-2023",
//     "17-FEB-2024",
//     "28-APR-2024",
// ]

// const endpoint = 'http://tincaphe.com/api/services/app/priceTableClient/GetValues';
// const api = axios.create({
//     withCredentials: true,
//     jar: cookieJar,
// });

// // get
// // http://tincaphe.com//api/account/logout

// // post
// // http://tincaphe.com//api/account/authenticate

// let payload = {
//     grant_type: "password",
//     client_id: "APP",
//     usernameOrEmailAddress: "integrated",
//     password: "welcome",
//     tenancyName: "Default",
//     rememberMe: false
// }

// let generatedTokenForAuthenticate;
// function Login() {
//     api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
//     api.post("http://tincaphe.com//api/account/authenticate", payload)
//         .then(response => {
//             console.log("response...........", response?.data?.result?.access_token?.slice(0, 50))
//             generatedTokenForAuthenticate = response?.data?.result?.access_token
//             // setTimeout(()=>{
//             //     Logout()
//             // },10000)
//         })
//         .catch(error => {
//             console.error('Error while logging in:', error.message);
//         });
// }


// function Logout() {
//     let currentTokenForLogout = generatedTokenForAuthenticate
//     console.log("currentTokenForLogout..........", currentTokenForLogout?.slice(0, 50))
//     api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
//     api.defaults.headers.common['Authorization'] = `Bearer ${currentTokenForLogout}`;
//     api.get("http://tincaphe.com//api/account/logout")
//         .then(response => {
//             console.log("Success Logout")
//             Login()
//         })
//         .catch(error => {
//             console.error('Error while logging out:', error.message);
//         });
// }

// // Login()

// setInterval(() => {
//     Logout()
// }, 3600000)

// let timeStamp = new Date()
// console.log(timeStamp)

// let generatedToken;

// setInterval(() => {
//     getTincapheData()
// }, 1000);

// let robustaGlobalArray = []
// let arabicaGlobalArray = []
// let xeGlobalArray = []

// let preCloseRobustaGlobalArray = []
// let preCloseArabicaGlobalArray = []
// let preCloseXeGlobalArray = []

// function myFunction() {
//     console.log("robustaGlobalArray",robustaGlobalArray)
//     console.log("arabicaGlobalArray",arabicaGlobalArray)
//     preCloseRobustaGlobalArray = robustaGlobalArray
//     preCloseArabicaGlobalArray = arabicaGlobalArray
//     // Replace this with your desired function's code
//     console.log("This function runs daily at 1:29:50 PM!");
//   }
  
//   // Schedule the function to run daily at 12:25 PM
//   cron.schedule('50 29 13 * * *', myFunction);
// //   cron.schedule('sec min hr * * *', myFunction);

// // cron.schedule('*/1 * * * *', myFunction);


// function getTincapheData() {
//     // let token2 = generatedToken
//     let token = generatedTokenForAuthenticate
//     api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
//     const authToken = 'ypblh8z-ejgFJ45pGqrlPyPWMcSeToZ5J6Deolg7EqXZdNtJMrXF55vLBHveiDmakNNP3TLoVY2-NDl64Efwet01zRqemYu4924EUPWTqtW1AbcwOCM10wKFI0kMjlEAY6lgvxYA4kSyi_ij6OieDwyA0mle9sadbWAgbbEi9YxdVHuGM0PKwtd5YCht6kMkY_Ndtlow7F0NL3-hMFWDHnP8j70F2spRbcR3o7tWtpkKsAszgy4DdDOVjApi-qses1HyuKvu_33xF6AhmXGegrUH0wP1297K3WmciT_dP_UY9AtJru_NW6Ox4aOo11zogKMY4yJadZVGWNmxboKgp4TujFTwoJBdPr11dIHxaICngJKzqNGDWh3uHVIjwoIlAxrgBjkgVALIhpq11QI1bcHFJRZvSRr1a__UOQ_6mCXI9DrHJeXNfD-4yD6S41XpiBmh0MYxFHEmjauB7UNkhCCqD2S4M2hFXPlP4l9raP9MDHh3PPnhAG9EDdx5dgvTmU5rOPb3liEPRMwxmu9GwxJwC2pIMf6-qrrlnCEjz0tOrbbe8ZqIL6RxLKjuhYNDFviRVCFqz0QekTo8EAmPGP8eRdQqDbM-2keRa-KAcHh9haCDFGWpqhf3_CjnQYp5ov81tWsMFG2VqK3AghWyaw';
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     api.post(endpoint)
//         .then(response => {

//             let robustaArray = []
//             let arabicaArray = []
//             let xeArray = []

//             let ittirationForRobusta = 0
//             let ittirationForArabica = 0
//             let ittirationForXE = 0

//             let newArray = response.data.result.map((ele, index) => {
//                 if (index >= 25 && index <= 29) {
//                     console.log(preCloseRobustaGlobalArray[ittirationForRobusta]?.lastChng)
//                 // if (index >= 36 && index <= 40) {
//                     const object = {
//                         isHighlight: 0,
//                         id: ittirationForRobusta,
//                         createdBy: 1,
//                         createdOn: new Date(),
//                         updatedBy: 1,
//                         updatedDtms: "2023-07-08T06:41:51.810Z",
//                         idMarket: 1,
//                         contractName: robustaNameList[ittirationForRobusta],
//                         lastChng: parseInt(ele.vs[1]),
//                         chng: ele.vs[2],
//                         percentageVal: ele.vs[3],
//                         volume: typeof ele.vs[4] == "string" ? parseInt(ele.vs[4].replace(",", "")) : ele.vs[4],
//                         highRate: typeof ele.vs[6] == "string" ? parseInt(ele.vs[6].replace(",", "")) : ele.vs[6],
//                         highRateCurrency: 0,
//                         lowRate: typeof ele.vs[7] == "string" ? parseInt(ele.vs[7].replace(",", "")) : ele.vs[7],
//                         lowRateCurrency: 0,
//                         openRate: typeof ele.vs[8] == "string" ? parseInt(ele.vs[8].replace(",", "")) : ele.vs[8],
//                         // prevRate: preCloseRobustaGlobalArray[ittirationForRobusta]?.lastChng,
//                         prevRate: typeof ele.vs[9] == "string" ? parseInt(ele.vs[9].replace(",", "")) : ele.vs[9],
//                         openInterest: ele.vs[10],
//                         bid: ele.vs[11],
//                         bsize: ele.vs[12],
//                         ask: ele.vs[13],
//                         asize: ele.vs[14],
//                         optionExpiry: optionExpiryForRobusta[ittirationForRobusta],
//                         firstNoticeDate: firstNoticeDateForRobusta[ittirationForRobusta],
//                         highCurrency: 0,
//                         lowCurrency: 0,
//                         marketName: robustaNameList[ittirationForRobusta],
//                         userSymbolId: 0,
//                         orderBy: 0
//                     }
//                     robustaArray.push(object)
//                     ittirationForRobusta += 1
//                 }
//                 if (index >= 3 && index <= 6) {
//                     const object = {
//                         isHighlight: 0,
//                         id: ittirationForArabica,
//                         createdBy: 1,
//                         createdOn: new Date(),
//                         updatedBy: 1,
//                         updatedDtms: "2023-07-08T06:41:51.810Z",
//                         idMarket: 2,
//                         contractName: arabicaNameList[ittirationForArabica],
//                         lastChng: parseFloat(ele.vs[1]),
//                         chng: ele.vs[2],
//                         percentageVal: ele.vs[3],
//                         volume: typeof ele.vs[4] == "string" ? parseInt(ele.vs[4].replace(",", "")) : ele.vs[4],
//                         highRate: typeof ele.vs[6] == "string" ? parseInt(ele.vs[6].replace(",", "")) : ele.vs[6],
//                         highRateCurrency: 0,
//                         lowRate: typeof ele.vs[7] == "string" ? parseInt(ele.vs[7].replace(",", "")) : ele.vs[7],
//                         lowRateCurrency: 0,
//                         openRate: typeof ele.vs[8] == "string" ? parseInt(ele.vs[8].replace(",", "")) : ele.vs[8],
//                         // prevRate: preCloseArabicaGlobalArray[ittirationForArabica]?.lastChng,
//                         prevRate: typeof ele.vs[9] == "string" ? parseInt(ele.vs[9].replace(",", "")) : ele.vs[9],
//                         openInterest: ele.vs[10],
//                         bid: ele.vs[11],
//                         bsize: ele.vs[12],
//                         ask: ele.vs[13],
//                         asize: ele.vs[14],
//                         optionExpiry: optionExpiryForArabica[ittirationForArabica],
//                         firstNoticeDate: firstNoticeDateForArabica[ittirationForArabica],
//                         highCurrency: 0,
//                         lowCurrency: 0,
//                         marketName: arabicaNameList[ittirationForArabica],
//                         userSymbolId: 0,
//                         orderBy: 0
//                     }
//                     arabicaArray.push(object)
//                     ittirationForArabica += 1
//                 }
//             });
//             postDataToCoffeeWeb(robustaArray, arabicaArray)
//             console.log("getting data from tincaphe")
//         })
//         .catch(error => {
//             console.error('Error while fetching data:', error.message);
//             // generateToken()
//             Login()
//         });
// }

// let localAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNDc0ODM2NDYiLCJuYmYiOjE2ODk2NTk3NDMsImV4cCI6MTY5MDI2NDU0MywiaWF0IjoxNjg5NjU5NzQzfQ.Pa7qAUSF5U2a1SVn5M60CP-RtxkyvofER3cVBbjVSJM"
// function postDataToCoffeeWeb(robustaArray, arabicaArray) {
//     let data = robustaArray.concat(arabicaArray);
//     robustaGlobalArray = robustaArray
//     arabicaGlobalArray = arabicaArray
//     // console.log(data)
//     fetch('https://coffeeweb.org/api/TincapheAuth/InsertTincapheData', {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${localAuthToken}`,
//             accept: "application/json",
//             "accept-language": "en_US",
//             "content-type": "application/json",
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             // console.log("done")
//             if (!response.ok) {
//                 throw new Error('Request failed with status ' + response.status);
//             }
//             return response.json();
//         })
//         .then(result => {
//             console.log("done")
//             // console.log(result);
//         })
//         .catch(error => {
//             console.error("error", error);
//         });
// }

// app.listen(process.env.PORT, async () => {
//     try {
//         console.log("connected to server")
//     }
//     catch (error) {
//         console.log(error.message)
//     }
// })

// //25: 89ee81a5-a680-4207-ad25-6547d2ac9339
// //26: a6225921-0804-4dc3-a15a-4967659abbda
// //27: f0538d6e-a937-4820-a8a6-934e4dde5724
// //28: 7cf1c98d-b646-479d-924d-9155ee2da13f
// //29: 6acae6b3-a63a-4831-8cbc-298b132d5381

// // 3: 2bf4396a-c63b-425d-b772-27c9691ada1f
// // 4: e83f088d-1d96-4ff8-b4d0-0eb35dcac720
// // 5: ad6789b9-b75c-43ac-8df7-14047fd376a2
// // 6: c06c6ac6-70e7-4aa5-80b9-622ae8c6f8ae



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
    "RCU-23 (SEP 23)",
    "RCX-23 (NOV 23)",
    "RCF-24 (JAN 24)",
    "RCH-24 (MAR 24)",
    "RCK-24 (MAY 24)"
]
let arabicaNameList = [
    "KCU-23 (SEP 23)",
    "KCZ-22 (DEC 23)",
    "KCH-23 (MAR 24)",
    "KCK-23 (MAY 24)"
]
let optionExpiryForRobusta = [
    "16-AUG-2023",
    "19-OCT-2023",
    // "20-DEC-2023",
    "21-DEC-2023",
    "15-FEB-2024",
    "19-APR-2024"
]
let firstNoticeDateForRobusta = [
    "25-AUG-2023",
    "26-OCT-2023",
    // "23-DEC-2023",
    "22-DEC-2023",
    "23-FEB-2024",
    "25-APR-2024"
]
let optionExpiryForArabica = [
    "11-AUG-2023",
    "11-NOV-2023",
    // "10-FEB-2024",
    "09-FEB-2024",
    "13-APR-2024",
]
let firstNoticeDateForArabica = [
    "23-AUG-2023",
    "21-NOV-2023",
    // "17-FEB-2024",
    "21-FEB-2024",
    "28-APR-2024",
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
            return value.replace(",", "")
        }
    }
    else {
        return value
    }
}

function getTincapheData() {
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post('http://tincaphe.com/api/services/app/priceTableClient/GetValues')
        .then(response => {

            let robustaArray = []
            let arabicaArray = []
            let xeArray = []

            let ittirationForRobusta = 0
            let ittirationForArabica = 0
            let ittirationForXE = 0

            for (let i = 0; i < rowIds.length; i++) {
                let targetedObject = response.data.result.find((ele) => rowIds[i] === ele.id)

                if (i <= 4) {
                    const currentDate = new Date();
                    const targetDateForOEForRobusta = new Date(optionExpiryForRobusta[ittirationForRobusta]);
                    const targetDateFNRForRobusta = new Date(firstNoticeDateForRobusta[ittirationForRobusta]);
                    const timeDifferenceForRobustaOE = targetDateForOEForRobusta - currentDate;
                    const timeDifferenceForRobustaFN = targetDateFNRForRobusta - currentDate;
                    const differenceInDaysForRobustaOE = Math.floor(timeDifferenceForRobustaOE / (1000 * 60 * 60 * 24));
                    const differenceInDaysForRobustaFN = Math.floor(timeDifferenceForRobustaFN / (1000 * 60 * 60 * 24));
                    let optionExpiryStatusForRubusta = () => {
                        if (differenceInDaysForRobustaOE < 10 && differenceInDaysForRobustaOE > 0) {
                            return "boldAndRed"
                        }

                        else if ((currentDate > targetDateForOEForRobusta) && (currentDate < targetDateFNRForRobusta)) {
                            return "expired"
                        }
                    }
                    let firstNoticeDayStatusForRubusta = () => {
                        if (differenceInDaysForRobustaFN < 10 && differenceInDaysForRobustaFN > 0) {
                            return "boldAndRed"
                        }
                        else if (differenceInDaysForRobustaOE < 10 && differenceInDaysForRobustaOE > 0) {
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
                        contractName: robustaNameList[ittirationForRobusta],
                        lastChng: parseInt(targetedObject.vs[1]),
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
                        optionExpiry: optionExpiryForRobusta[ittirationForRobusta],
                        optionExpiryStatus: optionExpiryStatusForRubusta(),
                        firstNoticeDate: firstNoticeDateForRobusta[ittirationForRobusta],
                        firstNoticeDateStatus: firstNoticeDayStatusForRubusta(),
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
                    const currentDate = new Date();
                    const targetDateForOEForArabica = new Date(optionExpiryForArabica[ittirationForArabica]);
                    const targetDateFNRForArabica = new Date(firstNoticeDateForArabica[ittirationForArabica]);
                    const timeDifferenceForArabicaOE = targetDateForOEForArabica - currentDate;
                    const timeDifferenceForArabicaFN = targetDateFNRForArabica - currentDate;
                    const differenceInDaysForArabicaOE = Math.floor(timeDifferenceForArabicaOE / (1000 * 60 * 60 * 24));
                    const differenceInDaysForArabicaFN = Math.floor(timeDifferenceForArabicaFN / (1000 * 60 * 60 * 24));
                    let optionExpiryStatusForArabica = () => {
                        if (differenceInDaysForArabicaOE < 10 && differenceInDaysForArabicaOE > 0) {
                            return "boldAndRed"
                        }

                        else if ((currentDate > targetDateForOEForArabica) && (currentDate < targetDateFNRForArabica)) {
                            return "expired"
                        }
                    }
                    let firstNoticeDayStatusForArabica = () => {
                        if (differenceInDaysForArabicaFN < 10 && differenceInDaysForArabicaFN > 0) {
                            return "boldAndRed"
                        }
                        else if (differenceInDaysForArabicaOE < 10 && differenceInDaysForArabicaOE > 0) {
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
                        contractName: arabicaNameList[ittirationForArabica],
                        lastChng: parseFloat(targetedObject.vs[1]),
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
                        optionExpiry: optionExpiryForArabica[ittirationForArabica],
                        optionExpiryStatus: optionExpiryStatusForArabica(),
                        firstNoticeDate: firstNoticeDateForArabica[ittirationForArabica],
                        firstNoticeDateStatus: firstNoticeDayStatusForArabica(),
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
            // setInterval(() => {
            //     callChild();
            // }, 10000);
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
    // console.log("++++++++++++++++++++++",data[0].optionExpiry)
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

let rowIdsForXE = [
    "89ee81a5-a680-4207-ad25-6547d2ac9339",
    "a6225921-0804-4dc3-a15a-4967659abbda",
    "f0538d6e-a937-4820-a8a6-934e4dde5724",
]
let XENameList = ["USD/INR", "USD/REAL", "USD/VND"]

let xeNameList = [
    {
        id: 1,
        currencyName: "USD/INR"
    },
    {
        id: 2,
        currencyName: "USD/REAL"
    },
    {
        id: 3,
        currencyName: "USD/VND"
    },
]

function getXECurrencyData() {
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post('http://tincaphe.com/api/services/app/priceTableClient/GetValues')
        .then(response => {

            let xeArray = []
            let ittirationForXE = 0

            for (let i = 0; i < rowIdsForXE.length; i++) {
                let targetedObject = response.data.result.find((ele) => rowIds[i] === ele.id)

                const object = {
                    currencyName: xeNameList[ittirationForXE].currencyName,
                    last: parseInt(targetedObject.vs[1]),
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
    console.log("getting XE data from tincaphe", xeArray)
    // fetch('https://coffeeweb.org/api/TincapheAuth/InsertTincapheData', {
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${localAuthToken}`,
    //         accept: "application/json",
    //         "accept-language": "en_US",
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify(xeArray)
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Request failed with status ' + response.status);
    //         }
    //         return response.json();
    //     })
    //     .then(result => {
    //         console.log("XE done")
    //     })
    //     .catch(error => {
    //         console.error("error", error);
    //     });
}



app.listen(process.env.PORT, async () => {
    try {
        console.log("connected to server")
    }
    catch (error) {
        console.log(error.message)
    }
})


