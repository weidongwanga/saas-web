
export function selectData(data = [], key, value) {
    const resArray = [];
    data.map((item, index) => (
        resArray.push({
            value: getJsonValue(item, key),
            name: getJsonValue(item, value),
        })
    ));

    return resArray;
}

function getJsonValue(obj, name) {
    var result = null;
    var value = null;
    for (var key in obj) {
        value = obj[key];
        if (key == name) {
            return value;
        } else {
            if (typeof value == "object") {
                result = getJsonValue(value, name);
            }
        }
    }
    return result;
}