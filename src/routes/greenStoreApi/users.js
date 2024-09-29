import express from 'express';
import User from '../../models/greenStoreApi/user.js';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/signup', async (req, res) => {
  console.log("POST sign up");
  console.log(req.body);
  
  const { name, uid, email, phone } = req.body;
  console.log("Phone", !phone);
  
  if (!name || !uid || (!email && !phone)) {
    return res.json({ code: 1, message: 'Please complete all information.' });
  }

  const d_t = new Date();
  const createdAt = `${d_t.getDate().toString().padStart(2, '0')}-${(d_t.getMonth() + 1).toString().padStart(2, '0')}-${d_t.getFullYear()} ${d_t.getHours()}:${d_t.getMinutes()}`;
  console.log(createdAt);

  try {
    await new User({ uid, name, phone, email, createdAt }).save();
    return res.json({ code: 0, message: "Add user successfully." });
  } catch (err) {
    console.error(err);
    return res.json({ code: 100, message: "Something went wrong, we can't add user." });
  }
});

router.post('/update', async (req, res) => {
  console.log("POST update");
  console.log(req.body);
  
  const { uid, name, address } = req.body;
  
  if ((!name || name.length < 1) && (!address || address.length < 1)) {
    return res.json({ code: 1, message: 'Please complete all information.' });
  }

  const filter = { uid };
  const update = {};

  if (name && name.length > 0) update.name = name;
  if (address && address.length > 0) update.address = address;

  try {
    const result = await User.findOneAndUpdate(filter, update, { new: true });
    
    if (!result) {
      return res.json({ code: 1, message: "Can't find user." });
    }
    
    return res.json({ code: 0, message: "Update user successfully." });
  } catch (err) {
    console.error(err);
    return res.json({ code: 100, message: "Something went wrong we can't update user." });
  }
});

router.get('/:uid', async (req, res) => {
  const id = req.params.uid;
  
  try {
    const result = await User.findOne({ uid: id });
    
    if (!result) {
      return res.json({ code: 1, message: 'No data' });
    }
    
    return res.json({ code: 0, message: 'Fetch product successfully', data: result });
  } catch (err) {
    console.error(err);
    return res.json({ code: 100, message: err.message });
  }
});

export default router;
