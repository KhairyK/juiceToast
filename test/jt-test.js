import juiceToast from '../dist/juice-toast.esm.js';
juiceToast.setup({
    success: {
        duration: 3000,
        position: 'top-left',
        progress: true,
        bg: '#28a745',
        dev: true,
    },
});
juiceToast.success('Operation completed successfully!');
