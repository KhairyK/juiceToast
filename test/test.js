import juiceToast from "juice-toast";

juiceToast.setup({
  success: { bg: "#11AA38" },
  error: { bg: "#FA2116" },
});

function post() {
  const isUpload = Math.random();

  if (isUpload >= 0.7) {
    juiceToast.success({
      title: "Upload Sukses",
      message: "File berhasil diupload",
      size: "lg",
      width: "480px",
      position: "center",
      progress: true
    });
    console.log('Berhasil')
  } else {
    juiceToast.error({
      title: "Gagal Upload",
      message: "File gagal diupload",
      size: "lg",
      width: "480px",
      position: "center",
      progress: true
    });
    console.log('Gagal')
  }
}

document
  .getElementById("postBtn")
  .addEventListener("click", post);
