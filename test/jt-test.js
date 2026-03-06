import juiceToast from 'juice-toast/src';

juiceToast.setup({custom:{}});

juiceToast.custom({ 
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
  use3d: true
});