const fs = require('fs');

function getFilesAndFoldersInDir(path) {
    const items = fs.readdirSync(path);
    const result = [];
    items.forEach(item => {
        const itemPath = `${path}/${item}`;
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
            let data = {
                // 文件夹
                type: 'folder',
                name: item
            }
            let children = getFilesAndFoldersInDir(itemPath)
            if (children && children.length) {
                data.children = children
            }
            result.push(data);
        } else {
            // 文件
            result.push({
                type: 'file',
                name: item
            });
        }
    });
    return result;
}
const list = getFilesAndFoldersInDir('C:\\Users\\Administrator\\Desktop\\React\\vuepress-demo\\docs\\foo\\cssMD')
const fileList = list.map(item=>'/foo/cssMD/'+item.name)
const list1 = getFilesAndFoldersInDir('C:\\Users\\Administrator\\Desktop\\React\\vuepress-demo\\docs\\foo\\JavaScriptMD')
const fileList1 = list1.map(item=>'/foo/JavaScriptMD/'+item.name)
const list2 = getFilesAndFoldersInDir('C:\\Users\\Administrator\\Desktop\\React\\vuepress-demo\\docs\\foo\\React')
const fileList2 = list2.map(item=>'/foo/React/'+item.name)
const list3 = getFilesAndFoldersInDir('C:\\Users\\Administrator\\Desktop\\React\\vuepress-demo\\docs\\foo\\Vue')
const fileList3 = list3.map(item=>'/foo/Vue/'+item.name)
module.exports = {
    head: [
        [
            'link', // 设置 favicon.ico，注意图片放在 public 文件夹下
            { rel: 'icon', href: '/img.png' }
        ]
    ],
    themeConfig:{
        logo:'https://www.logosc.cn//oss/icons/2022/09/03/9aab9c697d7125d64f828eba5b4e16c5.svg',
        nav: [
            // NavbarItem
            {text:'首页',link:'/'},
            {text: '学习路线',link:'/foo/'},
            {text: 'github',link:'https://github.com/QHSWGS'}
        ],
        sidebar: {
            '/foo/': [
                {
                    title:'css学习路线',
                    collapsable:true,
                    children: fileList,
                },
                {
                    title:'JavaScript学习路线',
                    collapsable:true,
                    children:fileList1
                },
                {
                    title:'React学习路线',
                    collapsable:true,
                    children:fileList2
                },
                {
                    title:'Vue学习路线',
                    collapsable:true,
                    children:fileList3
                },
            ],
        }
    }
}
