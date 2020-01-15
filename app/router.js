module.exports = app => {
    const { router, controller } = app;
    router.get('/podevent/log', controller.podevent.log);
    router.get('/podevent/getQRCode', controller.podevent.getQRCode);
};