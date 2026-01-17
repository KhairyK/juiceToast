import juiceToast from "../dist/juice-toast.esm.js";

juiceToast.setup({
  success: {
    bg: "#11AA38"
  },
  error: {
    bg: "#FA2116"
  },
  info: {
    bg: "#0721AF"
  }
});

juiceToast.info({
  message: "Update available",
  size: "lg",
  actions: [
    {
      label: "Reload",
      onClick() {
        location.reload();
      },
      closeOnClick: true,
    },
  ],
});

const isUpload = true;

if (isUpload) {
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
} else {
  juiceToast.error({
    title: "Gagal Upload",
    message: "File yang anda kirim Gagal diupload",
    size: "lg",
    width: "480px",
    icon: "fontic-no-data",
    iconPack: "fontic",
    iconSize: "1.8rem",
    duration: 4000,
    closable: true
  });
}