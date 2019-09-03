const _Array =
    {
        getValuesByKey: function (object, key) {
            var values = [];
            JSON.stringify(object, function (k, v) {
                if (k === key) values.push(v);
                return v;
            });
            return values;
        }

    };


function plainToFlattenObject(object) {
    const result = {}

    function flatten(obj, prefix = '') {
        _.forEach(obj, (value, key) => {
            if (_.isObject(value)) {
                flatten(value, `${prefix}${key}.`)
            } else {
                result[`${prefix}${key}`] = value
            }
        })
    }

    flatten(object)

    return result
}

export default _Array;
export {plainToFlattenObject}
