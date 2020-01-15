const Service = require('egg').Service;
const fs = require('fs');
class CommonService extends Service {
    //获取分页参数
    async log(adcode){
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

        //从 yy 查询上获取数据
        const result = await this.ctx.curl('https://api.ratingdog.cn/map/bound/'+adcode +'.json', {
            // 自动解析 JSON response
            dataType: 'text',
            // 30 秒超时
            timeout: 30000,
        });
        let str1 = JSON.stringify(result.data).replace(/\\/g,"");
        let str2 = str1.substr(2,str1.length-2);
        let str3 = str2.substr(0,str2.length-1);
        writeFileRecursive('./json/'+adcode+'.json',str3,function (err) {
            if (err) {
                res.status(500).send('Server is error...'

                )
            }
        });
        return false;
    }
}
module.exports = CommonService;