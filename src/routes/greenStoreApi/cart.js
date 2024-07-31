import express from "express";
const GStoreCartRouter = express.Router();

// MODELS
import Cart from "../../models/greenStoreApi/cart";
import Product from "../../models/greenStoreApi/product";

//SAMPLE DATA
import cart_data_sample from "../../samples/greenStoreApi/cart";

GStoreCartRouter.get("/init", (req, res, next) => {
  Cart.find({}).then((result) => {
    if (!result || result.length === 0) {
      try {
        Cart.insertMany(cart_data_sample.getSampleData);
      } catch (err) {
        console.log(err);
        return res.json({ code: 100, message: err.message });
      }
      return res.json({ code: 0, message: "Initialize data successfully." });
    }
    return res.json({ code: 1, message: "Cart list is not empty" });
  });
});

GStoreCartRouter.get("/:uid", (req, res, next) => {
  let uid = req.params.uid;
  Cart.find({ cus_id: uid, oid: "" })
    .then((result) => {
      if (!result || result.length === 0) {
        return res.json({ code: 1, message: "no data" });
      }
      return res.json({
        code: 0,
        message: "fetch data cart successfully",
        data: result,
      });
    })
    .catch((err) => {
      return res.json({ code: 100, message: err });
    });
});

GStoreCartRouter.post("/:uid/:pid", async (req, res, next) => {
  let uid = req.params.uid;
  let pid = req.params.pid;
  let isPID = "";

  Cart.find({ cus_id: uid, oid: "" })
    .then(async (result) => {
      if (!result || result.length === 0) {
        Cart.insertMany([{ cus_id: uid, oid: "" }])
          .then(async () => {
            // let isPIDPromise = checkPID(pid)
            // isPIDPromise.then((result2) =>{
            isPID = await checkPID(pid);
            if (isPID != null) {
              Cart.updateOne(
                { cus_id: uid, oid: "" },
                {
                  items: [
                    {
                      pid: isPID.pid,
                      price: isPID.price,
                      title: isPID.title,
                      url: isPID.url,
                      quantity: 1,
                    },
                  ],
                }
              )
                .then((result) => {
                  if (!result) {
                    return res.json({ code: 1, message: "No data." });
                  }
                  return res.json({
                    code: 0,
                    message: "Add item to order successfully.",
                  });
                })
                .catch((err) => {
                  return res.json({ code: 100, message: err });
                });
            } else {
              return res.json({ code: 101, message: "PID invalid" });
            }
          })
          //})
          .catch((err) => {
            return res.json({ code: 100, message: err });
          });
      } else {
        isPID = await checkPID(pid);
        if (isPID) {
          // let isDuplicate = await checkPIDwithOrderCreated(pid, uid)
          let dupPromise = checkPIDwithOrderCreated(pid, uid);
          dupPromise.then((isDuplicate) => {
            if (isDuplicate == 0) {
              Product.findOne({ pid: pid }).then((result) => {
                if (!result) {
                  return res.json({ code: 1, message: "No data" });
                }
                Cart.updateOne(
                  { cus_id: uid, oid: "" },
                  {
                    $push: {
                      items: {
                        pid: result.pid,
                        price: result.price,
                        title: result.title,
                        url: result.url,
                        quantity: 1,
                      },
                    },
                  }
                )
                  .then((result) => {
                    return res.json({
                      code: 0,
                      message: "Add item to order successfully. (2)",
                    });
                  })
                  .catch((err) => {
                    return res.json({ code: 1, message: err });
                  });
              });
            } else if (isDuplicate == 1) {
              Cart.updateOne(
                { cus_id: uid, oid: "", "items.pid": pid },
                {
                  $inc: { "items.$.quantity": 1 },
                }
              )
                .then((result) => {
                  return res.json({
                    code: 0,
                    message: "Add item to order successfully (1)",
                  });
                })
                .catch((err) => {
                  return res.json({ code: 100, message: err });
                });
            } else {
              return res.json({ code: 100, message: "OPID invalid" });
            }
          });
        } else {
          return res.json({ code: 101, message: "PID invalid" });
        }
      }
    })
    .catch((err) => {
      return res.json({ code: 100, message: err });
    });
});

GStoreCartRouter.put("/:uid/:pid", async (req, res, next) => {
  let uid = req.params.uid;
  let pid = req.params.pid;
  let isPID = "";

  Cart.find({ cus_id: uid, oid: "" })
    .then(async (result) => {
      if (!result || result.length === 0) {
        return res.json({ code: 1, message: "No data" });
      } else {
        isPID = await checkPID(pid);
        if (isPID) {
          let dupPromise = checkPIDwithOrderCreated(pid, uid);
          dupPromise.then((isDuplicate) => {
            if (isDuplicate == 0) {
              return res.json({
                code: 1,
                message: "Can't find item in order.",
              });
            } else if (isDuplicate == 1) {
              Cart.updateOne(
                { cus_id: uid, oid: "", "items.pid": pid },
                {
                  $inc: { "items.$.quantity": -1 },
                }
              )
                .then(() => {
                  Cart.updateOne(
                    { cus_id: uid, oid: "", "items.pid": pid },
                    {
                      $pull: { items: { quantity: 0 } },
                    }
                  )
                    .then(() => {
                      return res.json({
                        code: 0,
                        message: "Modify item to order successfully.",
                      });
                    })
                    .catch((err) => {
                      return res.json({ code: 100, message: err });
                    });
                })
                .catch((err) => {
                  return res.json({ code: 100, message: err });
                });
            } else {
              return res.json({ code: 100, message: "OPID invalid" });
            }
          });
        } else {
          return res.json({ code: 101, message: "PID invalid" });
        }
      }
    })
    .catch((err) => {
      return res.json({ code: 100, message: err });
    });
});

GStoreCartRouter.delete("/:uid/:pid", async (req, res, next) => {
  let uid = req.params.uid;
  let pid = req.params.pid;
  let isPID = "";

  Cart.find({ cus_id: uid, oid: "" })
    .then(async (result) => {
      if (!result || result.length === 0) {
        return res.json({ code: 1, message: "No data" });
      } else {
        isPID = await checkPID(pid);
        if (isPID) {
          let dupPromise = checkPIDwithOrderCreated(pid, uid);
          dupPromise.then((isDuplicate) => {
            if (isDuplicate == 0) {
              return res.json({ code: 1, message: "Can't find item in order" });
            } else if (isDuplicate == 1) {
              Cart.updateOne(
                { cus_id: uid, oid: "" },
                {
                  $pull: { items: { pid: pid } },
                }
              )
                .then(() => {
                  return res.json({
                    code: 0,
                    message: "Delete item in order successfully.",
                  });
                })
                .catch((err) => {
                  return res.json({ code: 100, message: err });
                });
            } else {
              return res.json({ code: 100, message: "OPID invalid" });
            }
          });
        } else {
          return res.json({ code: 101, message: "PID invalid" });
        }
      }
    })
    .catch((err) => {
      return res.json({ code: 100, message: err });
    });
});

function checkPID(pid) {
  return new Promise((resolve) => {
    Product.findOne({ pid: pid })
      .then((result) => {
        if (!result) {
          resolve(null);
        } else {
          resolve(result);
        }
      })
      .catch((err) => {
        resolve(null);
      });
  });
}

function checkPIDwithOrderCreated(pid, uid) {
  return new Promise((resolve) => {
    Cart.findOne({ cus_id: uid, oid: "", "items.pid": pid })
      .then((result) => {
        if (!result) {
          resolve(0);
        } else {
          resolve(1);
        }
      })
      .catch((err) => {
        resolve(-1);
      });
  });
}

GStoreCartRouter.get("/demo/:uid/:pid", (req, res, next) => {
  let { pid, uid } = req.params;
  Cart.findOne({ cus_id: uid, oid: "", "items.pid": pid })
    .then((result) => {
      if (!result) {
        return res.json({ code: 1, message: result });
      } else {
        return res.json({ code: 0, message: result });
      }
    })
    .catch((err) => {
      return res.json({ code: 100, message: err });
    });
});

GStoreCartRouter.get("/demo2/:pid", async (req, res, next) => {
  let pid = req.params.pid;
  let data = await checkPID(pid);
  return res.json({ datas: data });
});

// router.get('/totalPay/:uid',(req,res)=>{
//     let id = req.params.id
//     Product.findOne({ pid: id })
//         .then(result => {
//             if (!result) {
//                 return res.json({ code: 1, message: 'No data' })
//             }
//             return res.json({ code: 0, message: 'fetch product successfully', data: result })
//         })
//         .catch(err => {
//             return res.json({ code: 100, message: err })
//         })
// })

export default GStoreCartRouter;
