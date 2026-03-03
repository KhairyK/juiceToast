import juiceToast from 'juice-toast/src';

juiceToast.modal({
  title: "Delete File?",
  message: "Are you sure you want to delete this file?",
  actions: [
    { label: "Cancel" },
    { 
      label: "Delete", 
      onClick: () => console.log("Deleted!"),
      closeOnClick: true 
    }
  ]
});