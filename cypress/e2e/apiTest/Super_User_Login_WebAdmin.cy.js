/// <reference types="cypress" />

const Ajv = require("ajv");
const { UserPromptHandler } = require("selenium-webdriver/lib/capabilities");
const avj = new Ajv();

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
      expect(response.body.AlertType).to.eq("success");
      expect(response.body.HasError).to.eq(false);
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

  var birthName = "Leonid-12345";

  const createClient = function (firstN, lastN) {
    console.log("firstN ", firstN);
    console.log("lastN ", lastN);
    cy.request({
      url: "http://localhost:15261/api/en/6/Client/CreateClient",
      method: "POST",
      body: {
        Email: rEmail,
        Currency: "FTN",
        Region: "am",
        BirthName: birthName,
        FirstName: firstN,
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
      },
    }).then((response) => {
      const schema = {
        type: "object",
        required: ["StatusCode", "Data"],
        properties: {
          StatusCode: { type: "string" },
          Data: {
            type: "object",
            properties: {
              UserId: { type: "integer" },
              UserName: { type: "string" },
              CurrencyId: { type: "string" },
            },
            required: ["UserId", "UserName", "CurrencyId"],
          },
        },
      }; // end Shcema
      const validate = avj.compile(schema);
      const isvalid = validate(response.body);
      cy.log("Schema validation", isvalid);
      //expect(isvalid).to.be.true;
      expect(response.status).to.eq(200);
      userId = response.body.Data.UserId;
      currencyId = response.body.Data.CurrencyId;
      loginEmail = response.body.Data.UserName;
      cy.log("Status", response.body.StatusCode);
      cy.log(`- ResponseBody: ${JSON.stringify(response.body)}`);
    });
  };
  let userId = null;
  let currencyId = null;
  let loginEmail = null;

  it("Create clien", () => {
    getFakeUserData().then((clientData) => {
      console.log("clientData.firstname ", clientData.firstname);
      console.log("clientData.lastname ", clientData.lastname);
      createClient(clientData.firstname, clientData.lastname);
    });
  });

  let clientToken = null;
  it("Can Login", () => {
    cy.request({
      url: "http://localhost:15261/api/en/6/Client/Login",
      method: "POST",
      body: {
        Login: loginEmail,
        Password: password,
        LoginIP: "127.0.0.1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(`- ResponseBody: ${JSON.stringify(response.body)}`);
      clientToken = response.body.Data.Token;
      cy.log(response.body.AlertMessage);
      expect(response.status).to.eq(200);
      //console.log("sdds", response.body.StatusCode)
      expect(response.body.StatusCode).to.eq("0");
    });
  });

  it("Update Client Details-verify ", () => {
    cy.request({
      url: "http://localhost:2112/api/en/Client/UpdateClientDetails",
      method: "POST",
      headers: {
        Authentication: AuthToken,
      },
      body: {
        Id: userId,
        CurrencyId: "FTN",
        Currencies: null,
        FirstName: "Ansley",
        LastName: "O'Hara",
        MiddleName: null,
        Login: "m9gvtnsy@mail.com",
        RegionId: 19,
        Gender: 0,
        PersonalId: null,
        Address: "TUnnnn",
        Email: rEmail,
        Language: "en",
        Phone: "5555555",
        MobilePhone: null,
        BirthDate: "1949-03-04T00:00:00",
        TimeZone: null,
        NickName: null,
        DocNumber: null,
        IBAN: null,
        PromoCode: null,
        ProfileId: null,
        MaximalDailyBet: null,
        MaximalSingleBet: null,
        CasinoMaximalDailyBet: null,
        CasinoMaximalSingleBet: null,
        PreMatchSelectionLimit: 2,
        LiveSelectionLimit: 1,
        Excluded: null,
        ExcludedLocalDate: null,
        IsSubscribedToNewsletter: false,
        IsVerified: true,
        PartnerName: "Vivaro.AGP",
        PartnerId: 1001,
        LastLoginIp: "127.0.0.1",
        YesterdayBalance: null,
        CreditLimit: 0,
        IsUsingCredit: false,
        LastLoginTime: null,
        LastLoginLocalDate: null,
        Balance: 0,
        IsLocked: false,
        IsCasinoBlocked: null,
        IsSportBlocked: null,
        IsRMTBlocked: null,
        Password: null,
        SportsbookProfileId: 1,
        GlobalLiveDelay: 1,
        Created: "2024-03-15T13:11:23.023+04:00",
        CreatedLocalDate: "2024-03-15T11:11:23.023",
        RFId: null,
        ResetExpireDate: null,
        ResetExpireDateLocal: null,
        DocIssuedBy: null,
        IsUsingLoyaltyProgram: true,
        LoyaltyPoint: 0,
        AffilateId: null,
        BTag: "8s9t545",
        TermsAndConditionsVersion: null,
        TCVersionAcceptanceDate: null,
        TCVersionAcceptanceLocalDate: null,
        ExcludedLast: null,
        ExcludedLastLocal: null,
        UnplayedBalance: 0,
        IsTest: false,
        ExternalId: null,
        AuthomaticWithdrawalAmount: null,
        AuthomaticWithdrawalMinLeftAmount: null,
        IsAutomaticWithdrawalEnabled: null,
        SwiftCode: null,
        Title: null,
        BirthCity: null,
        BirthDepartment: null,
        BirthRegionId: null,
        ZipCode: "0054",
        BirthRegionCode2: null,
        ActivationCode: null,
        ActivationCodeExpireDate: null,
        ActivationCodeExpireDateLocal: null,
        LastSportBetTime: null,
        LastSportBetTimeLocal: null,
        LastCasinoBetTime: null,
        LastCasinoBetTimeLocal: null,
        FirstDepositTime: null,
        FirstDepositDateLocal: null,
        LastDepositDateLocal: null,
        LastDepositTime: null,
        ActivationState: null,
        ExcludeTypeId: null,
        DocIssueDate: null,
        DocIssueCode: null,
        Province: null,
        IsResident: false,
        RegistrationSource: 100,
        IncomeSource: null,
        AccountHolder: null,
        CashDeskId: null,
        ClientCashDeskName: null,
        IsSubscribeToEmail: true,
        IsSubscribeToSMS: true,
        IsSubscribeToInternalMessage: true,
        IsSubscribeToPushNotification: true,
        IsSubscribeToPhoneCall: true,
        NotificationOptions: 0,
        IsLoggedIn: false,
        City: "Tun",
        CountryName: null,
        ClientVerificationDate: "2024-03-15T13:30:10.008+04:00",
        BankName: null,
        Status: 2,
        IsNoBonus: false,
        IsTwoFactorAuthenticationEnabled: false,
        IsQRCodeUsed: null,
        PartnerClientCategoryId: null,
        WrongLoginBlockLocalTime: null,
        WrongLoginAttempts: 0,
        PepStatusId: null,
        SelectedPepStatuses: null,
        DocRegionId: 247,
        DocRegionName: null,
        DocType: 3,
        DocExpirationDate: null,
        AMLRisk: null,
        ExclusionReason: null,
        Citizenship: null,
        IsPhoneVerified: false,
        IsMobilePhoneVerified: false,
        IsEkengVerified: false,
        IsEmailVerified: false,
        OwnerId: null,
        ChildId: null,
        BirthName: "Leonid-12345",
        StatusActiveDate: null,
        StatusActiveDateLocalTime: null,
        PartnerFlag: null,
      },
    }).then((response) => {
      cy.log(response.body.AlertMessage);
      expect(response.status).to.eq(200);
      expect(response.body.AlertMessage).to.eq(
        "Operation has completed successfully"
      );
      expect(response.body.HasError).to.eq(false);
    });
  });

  let canDeposit = null;
  it("Get Client Restriction ", () => {
    cy.request({
      url: `http://localhost:2112/api/null/Client/GetClientRestriction?clientId=${userId}`,
      method: "GET",
      headers: {
        Authentication: AuthToken,
      },
      body: {},
    }).then((response) => {
      expect(response.status).to.eq(200);
      canDeposit = response.body.Data.CanDeposit;
      cy.log("sdd-3", response.body.Data.CanDeposit);
    });
  });

  function DepositRequest(DepositRequestCount) {
    console.log(DepositRequestCount);
    if (DepositRequestCount < 1) {
      DepositRequestCount = null;
      cy.log("Condition Failed: Stopping Collection Test");
      return;
    }
    cy.request({
      url: "http://localhost:15261/api/en/6/ClientRequest/CreateClientRequest",
      method: "POST",
      headers: {
        Token: clientToken,
      },
      body: {
        Amount: "555",
        Type: "2",
        PaymentSystemId: "60",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      var DepositRequestAmount = response.body.Data.Amount;
      cy.log("Amount", DepositRequestAmount);
      const StatusCode = response.body.StatusCode

      if (DepositRequestAmount !== undefined) {
        cy.log(
          "Deposit Request created - Request Amount-" + DepositRequestAmount
        );
        const newNumber = DepositRequestCount - 1;
        DepositRequest(newNumber);
  
      }
      else if (StatusCode  !==0){
        it("Save Client Restriction ", () => {
          cy.request({
            url: "http://localhost:2112/api/en/Client/SaveClientRestriction",
            method: "POST",
            headers: {
              Authentication: AuthToken,
            },
            body: {
              ClientId: UserId,
              CanLogin: true,
              CanBet: true,
              CanDeposit: true,
              CanWithdraw: false,
              CanIncreaseLimit: true,
              CanClaimBonus: true,
              CanCasinoLogin: false,
            },
          }).then((response) => {
            expect(response.status).to.eq(200);
            const StatusCode = response.body.StatusCode;
            const AlertMessageValue = responseData.AlertMessage;
            cy.log("Client Restriction changed", AlertMessageValue);
            expect(AlertMessageValue).to.eq(
              "Operation has completed successfully"
            );
            cy.log();
          });
        });
      }
      else{
        it ("Get Client Deposit Requests With Totals", () =>{
          cy.request({
            url: "http://localhost:2112/api/null/Client/GetClientDepositRequestsWithTotals",
            method: "POST",
            headers: {
              Authentication: AuthToken,
            },
            body:{
              ClientId: UserId,
            }
          })
        })
      }
    });

    
  }

  it("Create Client Request-Deposit/Withdraw ", () => {
    if (canDeposit === true) {
      DepositRequest(0);
    } else {
      console.log("say hi");
      it("Save Client Restriction ", () => {
        cy.request({
          url: "http://localhost:2112/api/en/Client/SaveClientRestriction",
          method: "POST",
          headers: {
            Authentication: AuthToken,
          },
          body: {
            ClientId: UserId,
            CanLogin: true,
            CanBet: true,
            CanDeposit: true,
            CanWithdraw: false,
            CanIncreaseLimit: true,
            CanClaimBonus: true,
            CanCasinoLogin: false,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          const StatusCode = response.body.StatusCode;
          const AlertMessageValue = responseData.AlertMessage;
          cy.log("Client Restriction changed", AlertMessageValue);
          expect(AlertMessageValue).to.eq(
            "Operation has completed successfully"
          );
          cy.log();
        });
      });
    }
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
