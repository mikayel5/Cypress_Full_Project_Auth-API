describe("Login", () => {
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

  var Remail = GenereteRandomMail();
  console.log("remail", Remail);
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
 var Birthdate = moment(randomDate).format("YYYY-MM-DD");
 console.log("birt", Birthdate);


  const createClient = function (firstN, lastN) {

    cy.request({
      url: "http://localhost:15261/api/en/6/Client/CreateClient",
      method: "POST",
      body: {
        Email: `${Remail}`,
        Currency: "FTN",
        Region: "am",
        BirthName: "Leonid-11",
        FirstName: `${firstN}`,
        LastName: `${lastN}`,
        Gender: `${gender}`,
        Password: "qwer",
        Phone: "5555555",
        Address: "TUnnnn",
        Birthdate: `${Birthdate}`,
        BTag: "8s9t545",
        ZipCode: "0054",
        City: "Tun",
        DocType: "3",
        DocRegionId: "247",
        RegistrationSource: 99,
        SwarmRegistrationSource: 100,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      //  UserId = response.body.Data.UserId;
      //  CurrencyId = response.body.Data.CurrencyId;
      //  Login = response.body.Data.UserName;
      cy.log("Status", response.body.StatusCode)
      cy.log(`- ResponseBody: ${JSON.stringify(response.body)}`);
    });
  };

  it("Create client and login", () => {
    getFakeUserData().then((clientData) => {
      createClient(clientData.firstname, clientData.lastname);
    });
  });

  it("Can Login", () => {
    // Assuming login credentials are stored in a separate file or environment variable
    const loginEmail = "yyxtbi3v@mail.com";
    const loginPassword = "qwer";

    cy.request({
      url: "http://localhost:15261/api/en/6/Client/Login",
      method: "POST",
      body: {
        Login:  "eqwt4lwq@mail.com",
        Password:"qwer",
        LoginIP: "127.0.0.1",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      console.log("Login-1", response.body.StatusCode);
    });
  });
});
