import juiceToast from 'juice-toast';

(juiceToast as any).setup({
    success: {
        duration: 3000,
        position: 'top-left',
        progress: true,
        bg: '#28a745',
    }
});

(juiceToast as any).success('Operation completed successfully!');