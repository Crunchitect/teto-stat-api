const express = require('express')
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const port = 5000;

let count = 0;

router.get('/:id', async (req, res) => {
    const name = req.params.id;
    let returnVal;

    const apmsrw = 0;
    const ppssrw = 135;
    const vssrw = 0;
    const appsrw = 290;
    const dsssrw = 0;
    const dspsrw = 700;
    const gesrw = 0;

    const slug = await fetch(`https://ch.tetr.io/api/users/${name}`);
    const { success, data } = await slug.json();
    const { user: { league: { apm, vs, pps } } } = data;
    if (!success) returnVal = {success: false}
    else {
        const app = (apm / 60 / pps);
        const dss = (vs / 100) - (apm / 60);
        const dsp = dss / pps;
        const ge = ((app * dss) / pps) * 2;
        const vsapm = vs / apm;

        const srarea = (apm * apmsrw) + (pps * ppssrw) + (vs * vssrw) + (app * appsrw) + (dss * dsssrw) + (dsp * dspsrw) + (ge * gesrw);
        const sr = (11.2 * Math.atan((srarea - 93) / 130)) + 1;

        const opener = Number(Number(Number((((apm / srarea) / ((0.069 * 1.0017 ** ((sr ** 5) / 4700)) + sr / 360) - 1) + (((pps / srarea) / (0.0084264 * (2.14 ** (-2 * (sr / 2.7 + 1.03))) - sr / 5750 + 0.0067) - 1) * 0.75) + (((vsapm / (-(((sr - 16) / 36) ** 2) + 2.133) - 1)) * -10) + ((app / (0.1368803292 * 1.0024 ** ((sr ** 5) / 2800) + sr / 54) - 1) * 0.75) + ((dsp / (0.02136327583 * (14 ** ((sr - 14.75) / 3.9)) + sr / 152 + 0.022) - 1) * -0.25)) / 3.5) + 0.5).toFixed(4));
        const plonk = Number(Number((((ge / (sr / 350 + 0.005948424455 * 3.8 ** ((sr - 6.1) / 4) + 0.006) - 1) + (app / (0.1368803292 * 1.0024 ** ((sr ** 5) / 2800) + sr / 54) - 1) + ((dsp / (0.02136327583 * (14 ** ((sr - 14.75) / 3.9)) + sr / 152 + 0.022) - 1) * 0.75) + (((pps / srarea) / (0.0084264 * (2.14 ** (-2 * (sr / 2.7 + 1.03))) - sr / 5750 + 0.0067) - 1) * -1)) / 2.73) + 0.5).toFixed(4));
        const stride = Number(Number((((((apm / srarea) / ((0.069 * 1.0017 ** ((sr ** 5) / 4700)) + sr / 360) - 1) * -0.25) + ((pps / srarea) / (0.0084264 * (2.14 ** (-2 * (sr / 2.7 + 1.03))) - sr / 5750 + 0.0067) - 1) + ((app / (0.1368803292 * 1.0024 ** ((sr ** 5) / 2800) + sr / 54) - 1) * -2) + ((dsp / (0.02136327583 * (14 ** ((sr - 14.75) / 3.9)) + sr / 152 + 0.022) - 1) * -0.5)) * 0.79) + 0.5).toFixed(4));
        const infds = Number(Number((((dsp / (0.02136327583 * (14 ** ((sr - 14.75) / 3.9)) + sr / 152 + 0.022) - 1) + ((app / (0.1368803292 * 1.0024 ** ((sr ** 5) / 2800) + sr / 54) - 1) * -0.75) + (((apm / srarea) / ((0.069 * 1.0017 ** ((sr ** 5) / 4700)) + sr / 360) - 1) * 0.5) + ((vsapm / (-(((sr - 16) / 36) ** 2) + 2.133) - 1) * 1.5) + (((pps / srarea) / (0.0084264 * (2.14 ** (-2 * (sr / 2.7 + 1.03))) - sr / 5750 + 0.0067) - 1) * 0.5)) * 0.9) + 0.5).toFixed(4));

        returnVal = {opener, plonk, stride, infds};
    }

    res.json(returnVal);
});

// router.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

app.use(`/.netlify/functions/index`, router);

module.exports = app;
module.exports.handler = serverless(app);
