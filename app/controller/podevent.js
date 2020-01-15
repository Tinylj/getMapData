const Controller = require('egg').Controller;
const fs = require('fs');
class podeventController extends Controller {
    //测试获取实际内容
    async log() {
        //指定一个文件夹并写入文件，如果不存在则创建该文件夹。
        const writeFileRecursive = function(path, buffer, callback){
            let lastPath = path.substring(0, path.lastIndexOf("/"));
            fs.mkdir(lastPath, {recursive: true}, (err) => {
                if (err) return callback(err);
                fs.writeFile(path, buffer, function(err){
                    if (err) return callback(err);
                    return callback(null);
                });
            });
        };
        //首先读取areaCode。然后根据AreaCode遍历爬取yy查询上的数据
        let currentUrl = "http://" + this.ctx.request.header.host+ '/public/areaCode/100000_province.json';
        const areaCodeList = await this.ctx.curl(currentUrl, {
            // 自动解析 JSON response
            dataType: 'json',
            // 30 秒超时
            timeout: 30000,
        });
        console.log(areaCodeList);

        for(let i=0;i<areaCodeList.data.rows.length;i++) {

        }


        //从 yy 查询上获取数据
        const result = await this.ctx.curl('https://api.ratingdog.cn/map/bound/231102.json', {
            // 自动解析 JSON response
            dataType: 'text',
            // 30 秒超时
            timeout: 30000,
        });
        let str1 = JSON.stringify(result.data).replace(/\\/g,"");
        let str2 = str1.substr(2,str1.length-2);
        let str3 = str2.substr(0,str2.length-1);
        writeFileRecursive('./json/231102.json',str3,function (err) {
            if (err) {
                res.status(500).send('Server is error...'

                )
            }
        });

        let mlc = await this.ctx.service.common.log();


        this.ctx.body = {
            package: "心态崩了啊，老铁。正在下载自己不会看文件夹吗...",
        };

    }
    //获取二维码
    async getQRCode() {

    }
}

module.exports = podeventController;