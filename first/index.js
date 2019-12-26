// 请实现find函数，使下列的代码调用正确。
// 约定：
// title数据类型为String
// userId为主键，数据类型为Number
const data = [
    {userId: 8,  title: 'title1'},
    {userId: 11, title: 'other'},
    {userId: 15, title: null},
    {userId: 19, title: 'title2'}
];
const find = function(origin) {
    origin = origin || [];
    let filteredOrigin = null;
    let filterObj = {};
    const matchers = [
        (rule, val) => {
            if (!rule) return true;
            return rule.exec && !!rule.exec(val);
        },
        (rule, val) => {
            if (!rule) return true;
            return rule === val;
        }
    ];

    function filter() {
        if (!filteredOrigin) {
            filteredOrigin = origin.filter(item => {
                return Object.keys(filterObj).every(filterKey => {
                    const filterRule = filterObj[filterKey];
                    const val = item[filterKey];

                    return matchers.some(matcher => matcher(filterRule, val));
                })
            });
        }
    }

    const context = {
        where: filter => {
            filterObj = filter;
            filteredOrigin = null;
            return context;
        },
        orderBy: (key, direction = 'asc') => {
            // filter lazily
            filter();

            // Sort
            if (key) {
                filteredOrigin.sort((a, b) => {
                    const res = a[key] < b[key] ? -1 : 1;
                    return direction === 'desc' ? -res : res;
                });
            }

            return filteredOrigin;
        }
    };
    return context;
};
// 查找 data 中，符合条件的数据，并进行排序
const result = find(data).where({
    'title': /\d$/
}).orderBy('userId', 'desc');

console.log(result);// [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
