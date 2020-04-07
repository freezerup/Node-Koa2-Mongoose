const OSS = require('ali-oss');

const client = new OSS({
  region: 'xxxx',
  accessKeyId: 'xxxxx',
  accessKeySecret: 'xxxxx',
  bucket: 'xxxxx'
});

exports.uploadImg = async (ctx, next) => {
  const filePath = ctx.query.filePath;

  try {
    const result = await client.put('xxxx/', filePath);
    console.log(result);
    ctx.body = {
      success: true,
      result,
    }
  }
  catch(e) {
    ctx.body = {
      success: false
    }
    return next
  }
}