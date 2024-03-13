/// <reference types="cypress" />

const Ajv = require('ajv');
const avj = new Ajv()

describe("Login-WebAdmin", () => {

  let AuthToken = null;

  it("status code", () => {
    cy.request({
      url: "http://localhost:2112/api/en/Account/Login",
      method: "POST",
      body: {
        UserName: "1",
        Password: "1",
        Language: "en",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers).to.have.property("authentication");
      AuthToken = response.headers.authentication;
      expect(AuthToken).to.not.be.empty;
    });
  });

  it("Save Settings Webadmin", () => {
    cy.request({
      url: "http://localhost:2112/api/en/setting/saveSetting",
      method: "POST",
      headers: {
        Authentication: AuthToken,
      },
      body: {
        Language: null,
        TimeZone: 4,
        OddsType: null,
        ReportCurrency: "AMD",
        ReportPartner: 6,
        HubNotificationSettings: [
          {
            Subscription: 1,
          },
          {
            Subscription: 2,
          },
          {
            Subscription: 3,
          },
          {
            Subscription: 4,
          },
          {
            Subscription: 6,
          },
          {
            Subscription: 7,
          },
          {
            Subscription: 13,
          },
          {
            Subscription: 14,
          },
        ],
        IsAppliedPartnerDefaults: true,
        ReportsColumns: {
          DashboardWidgetSettings: [
            "SportsbookMultiWidget",
            "DashboardSmallWidgets",
            "ProfitWidget",
            "CasinoMultiWidget",
            "PokerMultiWidget",
            "PokerRakeWidget",
            "BonusWidget",
            "TopSports",
            "TopGames",
          ],
          SelfExcludedClients: [
            "ClientId",
            "CreatedLocal",
            "ExclusionType",
            "Email",
            "UserName",
            "SourceName",
            "Reason",
            "ReasonText",
          ],
        },
        ViewMode: 3,
        DecimalPrecision: 1,
        IsSaveFilters: false,
        ViewStyle: null,
        DateFormat: "YYYY-MM-DD HH:mm",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

var clientData = ""; // Function to get fake user data using cy.request

  function getFakeUserData() {
    return cy
      .request({
        url: "https://fakerapi.it/api/v1/users?_quantity=1",
        method: "GET",
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        clientData = response.body.data[0];
        return clientData; // Returning the clientData for further use
      });
  } 
  
  function GenereteRandomMail() {
    var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    var email = "";
    for (var i = 0; i < 8; i++) {
      email += chars[Math.floor(Math.random() * chars.length)];
    }
    email += "@mail.com";
    return email;
  }
  //Set random email in Collection Variable

  var rEmail = GenereteRandomMail();

  //Get Random First Name and Last Name from fakerapi.it and set Collection variable

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  var gender = getRandomInt(2);


 //------Generete Password
 var password = Math.random().toString(36).slice(2, 10);

 //-----Generete Birthdate date random , age above 23
 var moment = require("moment");
 var fromDate = moment("1920-01-01");
 var toDate = moment("2000-01-01");
 var diffInMilliseconds = toDate.valueOf() - fromDate.valueOf();
 var randomMilliseconds = Math.random() * diffInMilliseconds;
 var randomDate = fromDate.valueOf() + randomMilliseconds;
 var birthDate = moment(randomDate).format("YYYY-MM-DD");

 var  birthName= "Leonid-12345";



  const createClient = function (firstN, lastN) {

    cy.request({
      url: "http://localhost:15261/api/en/6/Client/CreateClient",
      method: "POST",
      body: {
        Email: rEmail,
        Currency: "FTN",
        Region: "am",
        BirthName: birthName,
        FirstName:  firstN,
        LastName: lastN,
        Gender: gender,
        Password: password,
        Phone: "5555555",
        Address: "TUnnnn",
        Birthdate: birthDate,
        BTag: "8s9t545",
        ZipCode: "0054",
        City: "Tun",
        DocType: "3",
        DocRegionId: "247",
        RegistrationSource: 99,
        SwarmRegistrationSource: 100,
      },
    }).then((response) => {
      const schema = {
        "type": "object",
        "required": ["StatusCode", "Data"],
        "properties": {
          "StatusCode": {"type": "string"},
          "Data": {
            "type": "object",
            "properties": {
              "UserId": {"type": "integer"},
              "UserName": {"type": "string"},
              "CurrencyId":{"type":"string"},
            },
            "required": ["UserId", "UserName","CurrencyId",]
          }
        },
        
      }; // end Shcema
      const validate = avj.compile(schema)
      const isvalid = validate(response.body)
      cy.log("Schema validation", isvalid)
      expect(isvalid).to.be.true
      expect(response.status).to.eq(200);
        userId = response.body.Data.userId;
        currencyId = response.body.Data.currencyId;
        loginEmail = response.body.Data.UserName;
      cy.log("Status", response.body.StatusCode)
      cy.log(`- ResponseBody: ${JSON.stringify(response.body)}`);
    });
  };
let userId = null;
let currencyId = null;
let loginEmail = null;

  it.only("Create client and login", () => {
    getFakeUserData().then((clientData) => {
      createClient(clientData.firstname, clientData.lastname);
    });
  });

  it("Can Login", () => {
    console.log("password", password)
    cy.request({
      url: "http://localhost:15261/api/en/6/Client/Login",
      method: "POST",
      body: {
        Login:  loginEmail,
        Password:password,
        LoginIP: "127.0.0.1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log("Login-1", response.body.Data.LastName);
    });
  });

  // it("Can Deposit ", () => {
  //   cy.request({
  //     url: "http://localhost:2112/api/null/Client/GetClientRestriction?clientId=17755184",
  //     method: "GET",
  //     headers: {
  //       Authentication: AuthToken,
  //     },
  //   }).then((response) => {
  //     expect(response.status).to.eq(200);
  //     const StatusCode = response.body.StatusCode;
  //     console.log("sdd", StatusCode);

  //   });
  // });
});
