module.exports = (restaurantName, qr) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
      <style>
          * {
              padding: 0;
              margin: 0;
              font-family: 'Helvetica', 'Arial', sans-serif;
              box-sizing: border-box;
              font-size: 10px;
          }
          body {
              display: flex;
              justify-content: center;
              align-self: center;
              height: 100vh;
          }
  
          .content {
              /* position: absolute;
              margin-top: 5rem;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); */
              margin: auto auto auto auto;
              background-color: #fff;
              height: 50rem;
              width: 50rem;
              border: solid 1px #000;
          }
  
          .relative {
              height: 100%;
              width: 100%;
              padding: 3rem;
              text-align: center;
              vertical-align: middle;
              position: relative;
          }
  
          .content h1 {
              font-size: 4rem;
              color: #000000;
              text-align: center;
              font-weight: 300;
          }
  
          .qr {
              text-align: center;
              height: 25rem;
              width: 25rem;
              /* position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%); */
          }
  
          ul {
              list-style: none;
              width: 30rem;
              margin: auto;
          }
  
          li {
              text-align: left;
              font-size: 2rem;
          }
  
          .footer {
              width: 100%;
              padding: 1.5rem;
              font-size: 2rem;
              position: absolute;
              bottom: 0;
              left: 0;
              background-color: #F10C45;
              text-align: center;
              vertical-align: middle;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: #fff;
              font-style: italic;
          }
      </style>
  
      <title>PDF</title>
  </head>
  
  <body>
      <div class="content">
          <div class="relative">
              <h1 className="restaurant-name">${restaurantName}</h1>
              <img src="${qr}"
                  alt="" class="qr">
              <ul>
                  <li>
                      1. Open the camera app on your phone.
                  </li>
                  <li>
                      2. Scan QR Code.
                  </li>
                  <li>
                      3. Browse the menu!
                  </li>
              </ul>
              <div class="footer">
                  Courtesy of easymenu.com
              </div>
          </div>
  
      </div>
  
  
  </body>
  
  </html>
    `;
};
