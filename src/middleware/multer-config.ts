import multer, {StorageEngine, Multer} from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    import("uuid").then(({ v4: uuidv4 }) => {
      const id = uuidv4();
      const filename = `${base}_${id}${ext}`;
      cb(null, filename); 
    }).catch(err => cb(err, ""));
  }
})

const upload: Multer = multer({ storage: storage })

export default upload