const axios = require("axios")
const cheerio = require("cheerio")
// 用于将http响应中的数据写到文件中
const path = require("path")
const request = require("request")
const fs = require("fs")
const { index } = require("cheerio/lib/api/traversing")
const myUrl = "https://www.58pic.com/"
const imgDir = path.join(__dirname, "./imgs") // 图片路径
request(
    {
        url: myUrl
    },
    (error, res, body) => {
        getImg(body)
    }
)
function getImg(html) {
    const $ = cheerio.load(html)
    // TODO: use Set() 为图片地址去重
    const imgSrcSet = new Set()
    $("img").each(async (index, element) => {
        // 异步等待下载文件行为执行完毕
        const imgSrc = $(element).attr("src")
        imgSrcSet.add(imgSrc)
        for (const imgSrc in imgSrcSet)
            await downLoadImg("https:" + imgSrc, index + 1)
    })
}
function downLoadImg(imgSrc, index) {
    return new Promise((resolve, reject) => {
        if (imgSrc) {
            const suffix = imgSrc.split(".").pop() // image后缀
            let create = request(imgSrc).pipe(
                //pipe为异步任务，需等待执行完毕
                fs.createWriteStream(path.join(imgDir, `${index}.${suffix}`))
            )
            create.on("close", () => resolve("success"))
        } else {
            reject()
        }
    })
}
// 传输文件到数据库https://blog.csdn.net/weixin_45822938/article/details/121003635
