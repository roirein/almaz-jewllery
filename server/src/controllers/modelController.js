const JewelModel = require('../models/models/modelModel');
const ExistingModelOrder = require('../models/orders/existingModelOrder');
const OrderInDesign = require('../models/orders/orderInDesignModel');
const NewModelOrder = require('../models/orders/newModelOrderModel');
const { DESIGN_STATUS } = require('../consts/system-consts');
const { HTTP_STATUS_CODE } = require('../consts/http-consts');

const createNewModel = async (req, res, next) => {
    try {
        const modelData = {
            modelNumber: req.body.modelNumber,
            item: req.body.item,
            mainStone: req.body.mainStone,
            sideStone: req.body.sideStone,
            inlay: req.body.inlay,
            initialDesgin: req.body.initialDesgin,
            finalDesgin: req.body.finalDesgin,
            description: req.body.description
        }

        const model = await JewelModel.create(modelData);
        const existingModelOrderData = {
            orderId: req.body.orderId,
            item: req.body.item,
            metal: req.body.metal,
            size: req.body.size,
            comments: req.body.comments,
            modelNumber: model.modelNumber,
            wasOriginallyNewModelOrder: true
        }
        await ExistingModelOrder.create(existingModelOrderData);
        await NewModelOrder.destroy({
            where: {
                orderId: req.body.orderId,
            }
        })
        await OrderInDesign.update({
            status: DESIGN_STATUS.MANAGER_REVIEW,
            where: {
                orderId: req.body.orderId
            }
        })
        res.status(HTTP_STATUS_CODE.CREATED).send('model created successfully')
    } catch (e) {
        next(e);
    }
}