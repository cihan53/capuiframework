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

export default _Array;