require('dotenv').config();
const BINPATH = './node_modules/nightwatch/bin/'; // change if required.
const SCREENSHOT_PATH =
    './screenshots/' + require('./package.json').version + '/';

const config = {
    src_folders: ['test/main'],
    page_objects_path: 'test/pages',
    output_folder: './reports',
    selenium: {
        start_process: true,
        server_path: BINPATH + 'selenium.jar',
        log_path: '',
        host: '127.0.0.1',
        port: 4444,
        cli_args: {
            'webdriver.chrome.driver': BINPATH + 'chromedriver',
        },
    },
    test_workers: {
        enabled: true,
        workers: 'auto',
    }, // perform tests in parallel where possible
    test_settings: {
        default: {
            launch_url: 'http://localhost',
            selenium_host: 'ondemand.saucelabs.com',
            selenium_port: 80,
            selenium_start_process: false,
            silent: true,
            screenshots: {
                enabled: false,
                path: SCREENSHOT_PATH,
            },
            username: process.env.SAUCE_USERNAME,
            access_key: process.env.SAUCE_ACCESS_KEY,
            desiredCapabilities: {
                javascriptEnabled: true,
                acceptSslCerts: true,
                'tunnel-identifier': '${TRAVIS_JOB_NUMBER}',
            },
            globals: {
                waitForConditionTimeout: 10000,
                data: require('./test/context/index.js'),
            },
        },
        local: {
            launch_url: 'http://localhost',
            selenium_host: '127.0.0.1',
            selenium_port: 4444,
            silent: true,
            screenshots: {
                enabled: false, // save screenshots taken here
                path: SCREENSHOT_PATH,
            }, // this allows us to control the
            globals: {
                waitForConditionTimeout: 15000,
            },
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    args: [
                        `Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46
            (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3`,
                        '--window-size=640,1136', // iphone 5
                    ],
                },
                javascriptEnabled: true,
                acceptSslCerts: true,
            },
        },
        chrome: {
            // your local chrom browser (chromedriver)
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
            },
        },
        chromemac: {
            // browsers used on saucelabs:
            desiredCapabilities: {
                browserName: 'chrome',
                platform: 'OS X 10.11',
                version: '47',
            },
        },
        ie11: {
            desiredCapabilities: {
                browserName: 'internet explorer',
                platform: 'Windows 10',
                version: '11.0',
            },
        },
        safari: {
            // browsers used on saucelabs:
            desiredCapabilities: {
                browserName: 'safari',
                platform: 'OS X 10.11',
                version: '10',
            },
        },
        firefox: {
            desiredCapabilities: {
                platform: 'Windows 7',
                browserName: 'firefox',
                version: '45',
            },
        },
        android_s4_emulator: {
            desiredCapabilities: {
                browserName: 'android',
                deviceOrientation: 'portrait',
                deviceName: 'Samsung Galaxy S4 Emulator',
                version: '4.4',
            },
        },
        iphone_5_simulator: {
            desiredCapabilities: {
                browserName: 'iPhone',
                deviceOrientation: 'portrait',
                deviceName: 'iPhone 5',
                platform: 'OSX 10.10',
                version: '8.4',
            },
        },
        iphone_6_simulator: {
            desiredCapabilities: {
                browserName: 'iPhone',
                deviceOrientation: 'portrait',
                deviceName: 'iPhone 6',
                platform: 'OSX 10.10',
                version: '8.4',
            },
        },
    },
};
module.exports = config;

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function(err, stat) {
    // got it?
    if (err || !stat || stat.size < 1) {
        require('selenium-download').ensure(BINPATH, function(error) {
            if (error) throw new Error(error); // no point continuing so exit!
            console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
        });
    }
});
