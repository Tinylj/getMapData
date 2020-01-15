const Controller = require('egg').Controller;
const fs = require('fs');
class mapController extends Controller {
    //测试获取实际内容
    async log() {
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
        let mlc = await this.ctx.service.common.log();

        this.ctx.body = {
            package: "心态崩了啊，老铁。正在下载自己不会看文件夹吗...",
        };
    }
}

module.exports = mapController;