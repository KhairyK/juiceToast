import juiceToast from 'juice-toast/src';

juiceToast.setup({
  full: {},
  glass: {
    glassOnly: true, 
    duration: 4000
  },
  maxVisible: 4,
  glassUI: true, 
  urgentSkipsQueue: true
  });

juiceToast.full({ 
  title: "Custom", 
  message: "Styled toast", 
  bgImage: "https://images.unsplash.com/photo-1557683316-973673baf926?fit=crop&w=400&h=400", 
  color: "#f0f0f0", 
  glassUI: 85, 
  progress: true, 
  duration: 4000, 
  avatar: "./avatars/profile1.png", 
  position: "top-left", 
  parallaxMode: true, 
  use3d: true, 
  size: "lg"
});

juiceToast.glass("Glass Only");
juiceToast.success("Success");
juiceToast.error("Error");
juiceToast.info("Info");
juiceToast.loading({
  message: "Loading...", 
  duration: 4000
});

/*
juiceToast.modal({
  title: "Upload File",
  html:`
    <p>Choose file for the upload</p>
    <input type="file">
  `,
  animation: "jt-scale",
  actions: [
    {
      label: "Cancel", 
      buttonType: "outline"
    },
    {
      label: "Upload",
      buttonType: "primary", 
      onClick() {
        console.log("upload started")
      }
    }
  ]
});
*/

juiceToast.promise(
  fetch("https://jsonplaceholder.typicode.com/posts/1").then(r => r.json()),
  {
    success: { message: "Success to fecth the JSON!", icon: "fa-check" }, 
    error: { message: "Failed to fecth the JSON." }
  }
);

juiceToast.error({
  message: "This is a high priority",
  priority: "high",
  position: "top-left",
  size: "lg",
  width: "480px"
});

juiceToast.info({
  title: "Hello There",
  message: "Lorem ipsum dolor sit amet, this is low priority",
  position: "top-left",
  size: "lg",
  priority: "low"
});

juiceToast.success({
  message: "This is a normal priority",
  priority: "normal",
  position: "top-left",
  size: "md"
});

juiceToast.error({
  message: "This is a urgent priority",
  priority: "urgent",
  position: "top-left",
  size: "md"
});

juiceToast.full({
  message: "Swipe Threshold Test", 
  bg: "#0f172a", 
  swipeThreshold: 60
})