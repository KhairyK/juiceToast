import juiceToast from "juice-toast";

juiceToast.setup({
  success: {
    bg: "#11AA38"
  },
  error: {
    bg: "#FA2116"
  },
});

const isUpload = false;

if (isUpload) {
  juiceToast.success({
  title: "Upload Sukses",
  message: "File berhasil diupload",
  size: "lg",
  width: "480px",
  position: "center",
  icon: "fontic-cloud-upload",
  iconPack: "fontic",
  iconSize: "1.8rem",
  duration: 4000,
  closable: true,
  animation: "fade-in"
 });
} else {
  juiceToast.error({
    title: "Gagal Upload",
    message: "File yang anda kirim Gagal diupload",
    size: "lg",
    position: "center",
    width: "480px",
    icon: "fontic-no-data",
    iconPack: "fontic",
    iconSize: "1.8rem",
    duration: 4000,
    closable: true,
    animation: "bounce-in"
  });
}

