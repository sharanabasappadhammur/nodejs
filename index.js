import axios from "axios";
import tough from "tough-cookie"
import fetch from "node-fetch";
import express, { response } from "express"
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

// get
// http://tincaphe.com//api/account/logout

// post
// http://tincaphe.com//api/account/authenticate

let payload = {
    grant_type: "password",
    client_id: "APP",
    usernameOrEmailAddress: "Intefrated3",
    password: "789",
    tenancyName: "Default",
    rememberMe: false
}

let generatedTokenForAuthenticate;
function Login() {
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    api.post("http://tincaphe.com//api/account/authenticate", payload)
        .then(response => {
            console.log("response...........", response?.data?.result?.access_token?.slice(0, 50))
            generatedTokenForAuthenticate = response?.data?.result?.access_token
            // setTimeout(()=>{
            //     Logout()
            // },10000)
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

// Login()

setInterval(() => {
    Logout()
}, 3600000)

let timeStamp = new Date()
console.log(timeStamp)

let generatedToken;

setInterval(() => {
    getTincapheData()
}, 5000);

let robustaGlobalArray = []
let arabicaGlobalArray = []
let xeGlobalArray = []

function getTincapheData() {
    // let token2 = generatedToken
    let token = generatedTokenForAuthenticate
    api.defaults.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36';
    const authToken = 'ypblh8z-ejgFJ45pGqrlPyPWMcSeToZ5J6Deolg7EqXZdNtJMrXF55vLBHveiDmakNNP3TLoVY2-NDl64Efwet01zRqemYu4924EUPWTqtW1AbcwOCM10wKFI0kMjlEAY6lgvxYA4kSyi_ij6OieDwyA0mle9sadbWAgbbEi9YxdVHuGM0PKwtd5YCht6kMkY_Ndtlow7F0NL3-hMFWDHnP8j70F2spRbcR3o7tWtpkKsAszgy4DdDOVjApi-qses1HyuKvu_33xF6AhmXGegrUH0wP1297K3WmciT_dP_UY9AtJru_NW6Ox4aOo11zogKMY4yJadZVGWNmxboKgp4TujFTwoJBdPr11dIHxaICngJKzqNGDWh3uHVIjwoIlAxrgBjkgVALIhpq11QI1bcHFJRZvSRr1a__UOQ_6mCXI9DrHJeXNfD-4yD6S41XpiBmh0MYxFHEmjauB7UNkhCCqD2S4M2hFXPlP4l9raP9MDHh3PPnhAG9EDdx5dgvTmU5rOPb3liEPRMwxmu9GwxJwC2pIMf6-qrrlnCEjz0tOrbbe8ZqIL6RxLKjuhYNDFviRVCFqz0QekTo8EAmPGP8eRdQqDbM-2keRa-KAcHh9haCDFGWpqhf3_CjnQYp5ov81tWsMFG2VqK3AghWyaw';
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api.post(endpoint)
        .then(response => {

            let robustaArray = []
            let arabicaArray = []
            let xeArray = []

            let ittirationForRobusta = 0
            let ittirationForArabica = 0
            let ittirationForXE = 0

            let newArray = response.data.result.map((ele, index) => {
                if (index >= 26 && index <= 30) {
                // if (index >= 36 && index <= 40) {
                    const object = {
                        isHighlight: 0,
                        id: ittirationForRobusta,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: "2023-07-08T06:41:51.810Z",
                        idMarket: 1,
                        contractName: robustaNameList[ittirationForRobusta],
                        lastChng: parseInt(ele.vs[1]),
                        chng: ele.vs[2],
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
                        optionExpiry: optionExpiryForRobusta[ittirationForRobusta],
                        firstNoticeDate: firstNoticeDateForRobusta[ittirationForRobusta],
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
                    const object = {
                        isHighlight: 0,
                        id: ittirationForArabica,
                        createdBy: 1,
                        createdOn: new Date(),
                        updatedBy: 1,
                        updatedDtms: "2023-07-08T06:41:51.810Z",
                        idMarket: 2,
                        contractName: arabicaNameList[ittirationForArabica],
                        lastChng: parseFloat(ele.vs[1]),
                        chng: ele.vs[2],
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
                        optionExpiry: optionExpiryForArabica[ittirationForArabica],
                        firstNoticeDate: firstNoticeDateForArabica[ittirationForArabica],
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
            console.log("getting data from tincaphe")
        })
        .catch(error => {
            console.error('Error while fetching data 222222:', error.message);
            // generateToken()
            Login()
        });
}

let localAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIxNDc0ODM2NDYiLCJuYmYiOjE2ODk2NTk3NDMsImV4cCI6MTY5MDI2NDU0MywiaWF0IjoxNjg5NjU5NzQzfQ.Pa7qAUSF5U2a1SVn5M60CP-RtxkyvofER3cVBbjVSJM"
function postDataToCoffeeWeb(robustaArray, arabicaArray) {
    let data = robustaArray.concat(arabicaArray);
    // console.log("data", data)
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
            // console.log("done")
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            return response.json();
        })
        .then(result => {
            console.log("done")
            // console.log(result);
        })
        .catch(error => {
            console.error("error", error);
        });
}

function generateToken() {
    fetch('https://coffeeweb.org/api/TincapheAuth/GetTincapheToken', {
        method: 'get',
        headers: {
            // Authorization: `Bearer ${token}`,
            accept: "application/json",
            "accept-language": "en_US",
            "content-type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            return response.json();
        })
        .then(result => {
            // console.log(result.returnLst.token);
            generatedToken = result.returnLst.token
        })
        .catch(error => {
            // console.error("error", error);
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


// Error: getaddrinfo ENOTFOUND tincaphe.com, what does this error means
