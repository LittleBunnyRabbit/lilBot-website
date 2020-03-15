import request from 'request';

/** 
 * Fetches the data from the url.
 * 
 * @param {String} url
 * @param {{json:Boolean, headers:JSON}} json
 * 
 * @returns {Promise<JSON | String>}
 */
export const getData = (url, {json, headers}) => {
    return new Promise(function (resolve, reject) {
        request({
            headers: headers ? headers : {},
            uri: url,
            method: "GET",
            json: json ? json : true
        }, function (error, res, body) {
            if (!error && res.statusCode === 200) resolve(body);
            else reject(error);
        });
    });
}