  <p align="center">
    <h3 align="center">Type-safe, Well tested SDK for <a href="https://monkeytype.com/">Monkeytype.com</a></h3>

    <p align="center">
      <a href="https://github.com/GreXLin85/MonkeyTypeSDK/issues">Report Bug</a>
      |
      <a href="https://github.com/GreXLin85/MonkeyTypeSDK/issues">Request Feature</a>
    </p>
  </p>

  ![Issues](https://img.shields.io/github/issues/GreXLin85/MonkeyTypeSDK) ![License](https://img.shields.io/github/license/GreXLin85/MonkeyTypeSDK) 

  ## Table Of Contents

  * [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)
  * [Authors](#authors)
  * [Acknowledgements](#acknowledgements)

  ## Getting Started


  ### Prerequisites

  This is an example of how to list things you need to use the software and how to install them.
  * NodeJS 16 and newer versions

  ### Installation

  1. Get a free API Key at [APE Key section](https://monkeytype.com/settings#group_dangerZone)

  2. Install the package via NPM

  ```sh
  npm install monkeytypesdk
  ```
  or Yarn
  ```sh
  yarn add monkeytypesdk
  ```

  ## Usage
  ```js
  const  MonkeyTypeSDK = require('monkeytypesdk').default;
  const  SDK = new  MonkeyTypeSDK({
    apiKey:  'Your API Key',
  });

  /* 
    There are 3 categories of functions:
    1. Users
      1.1. users.personalBests
      1.2. users.stats
    2. Leaderboards
      2.1. leaderboards.get
      2.2. leaderboards.getUsersRank
    3. Results
      3.1. results.getLastResult
  */

  // For example, to get the personal bests of the current user:
  SDK.users.personalBests({
        mode: 'time',
        mode2: '60'
      }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

  ```

  ## Contributing

  Contributions are what makes the open source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
  * If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/GreXLin85/MonkeyTypeSDK/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
  * Please make sure you check your spelling and grammar.
  * Create individual PR for each suggestion.

  ### Creating A Pull Request

  1. Fork the Project
  2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
  3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
  4. Push to the Branch (`git push origin feature/AmazingFeature`)
  5. Open a Pull Request

  ## License

  Distributed under the MIT License. See [LICENSE](https://github.com/GreXLin85/MonkeyTypeSDK/blob/main/LICENSE.md) for more information.

  ## Authors

  * **Erol Umut "GreXLin85" Atalay** - *IT Student* - [Erol Umut "GreXLin85" Atalay](https://github.com/GreXLin85/)
