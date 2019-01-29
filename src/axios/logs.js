

export const addLogWhite = () => window.Axios.post('back/addLogHistory', {
    'moduleLog': '用户管理',
    'pageLog': '白名单',
    'commentLog': '查看了白名单',
    'typeLog': 2,
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});



