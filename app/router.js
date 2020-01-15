module.exports = app => {
    const { router, controller } = app;
    router.get('/map/log', controller.map.log);
};