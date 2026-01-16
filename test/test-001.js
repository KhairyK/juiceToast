import juiceToast from "../dist/juice-toast.esm.js";

juiceToast.setup({
  success: {
    bg: "#11AA38"
  },
  error: {
    bg: "#FA2116"
  }
});

const isLogin = true;

if (isLogin) {
  juiceToast.success({
  title: "Upload Sukses",
  message: "File berhasil diupload",
  size: "lg",
  width: "480px",
  icon: "fontic-cloud-upload",
  iconPack: "fontic",
  iconSize: "1.8rem",
  duration: 4000,
  closable: true
 });
}