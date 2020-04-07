const Router = require('koa-router');
const login = require('./controllers/login'); 
const user = require('./controllers/user'); // 用户信息操作
const sysFunction = require('./controllers/function'); // 系统功能
const meeting = require('./controllers/meeting'); // 会议室
const appointment = require('./controllers/appointment'); // 预约
const middleware = require('./controllers/middleware'); // token校验
const upload = require('./controllers/upload'); // token校验
const clear = require('./controllers/clear');
const rootRouter = new Router({
  prefix: '/api'
});

rootRouter.use(middleware.verify);
rootRouter.get('/token', login.token);
rootRouter.post('/login', login.login);
rootRouter.post('/user/add', user.siginup);
rootRouter.post('/user/update', user.update);
rootRouter.delete('/user/delete', user.delectUser);
rootRouter.get('/user/list', user.findUser);

rootRouter.post('/function/add', sysFunction.addFunction);
rootRouter.delete('/function/delete', sysFunction.deleteFunction);
rootRouter.post('/function/update', sysFunction.updateFunction);
rootRouter.get('/function/list', sysFunction.functionLists);

rootRouter.post('/meeting/add', meeting.addMeeting);
rootRouter.delete('/meeting/delete', meeting.deleteMeeting);
rootRouter.post('/meeting/update', meeting.updateMeeting);
rootRouter.get('/meeting/list', meeting.meetingLists);

rootRouter.post('/appointment/add', appointment.addAppointment);
rootRouter.delete('/appointment/delete', appointment.deleteAppointment);
rootRouter.post('/appointment/update', appointment.updateAppointment);
rootRouter.get('/appointment/list', appointment.appointmentLists);


rootRouter.post('/upload', upload.uploadImg);

/**
 * 用于测试数据清空
 * id: 0;1.....
 * 0:User;1:Appointment;2:Meeting;3:SysFunction;4:Station
 */
rootRouter.delete('/clear/:id', clear.clearAll);
module.exports = rootRouter;