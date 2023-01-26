import viewsController from '../views/controller.views.js';

const router = (app) => {
    app.use('/', viewsController);
}

export default router;