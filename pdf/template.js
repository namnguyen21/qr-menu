module.exports = (qr) => {
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
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); */
            margin: auto auto auto auto;
            background-color: #fff;
            height: 40rem;
            width: 40rem;
            border: solid 1px #000;
        }

        .relative {
            height: 100%;
            width: 100%;
            padding: 0;
            text-align: center;
            vertical-align: middle;
            position: relative;
            padding: 5rem 0;
        }

        .content h1 {
            font-size: 3rem;
            width: 100%;
            color: #000;
            font-weight: 400;
            margin-bottom: 3rem;
        }

        .qr {
            text-align: center;
            height: 15rem;
            width: 15rem;
            border: solid 5px #000;
            margin: 10px auto 0;
        }


        .footer {
            width: 100%;
            padding: 1rem;
            font-size: 1.6rem;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: #000000;
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
              <h1 className="restaurant-name">Scan code to view menu</h1>
              <img src="${qr}"
                  alt="" class="qr">
              <div class="footer">
                  Courtesy of snapmenu.us
              </div>
          </div>
  
      </div>
  
  
  </body>
  
  </html>
    `;
};
