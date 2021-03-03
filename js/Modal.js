export default class Modal {
    constructor(form, modalTitleText) {
        this.elements = {
            modalOverlay: document.createElement('div'),
            modal: document.createElement('div'),
            modalDialog: document.createElement('div'),
            modalContent: document.createElement('div'),
            modalHeader: document.createElement('div'),
            modalTitle: document.createElement('h3'),
            modalCloseBtn: document.createElement('button'),
            modalIconClose: document.createElement('span'),
            modalBody: document.createElement('div'),
        }

        this.modalTitleText = modalTitleText;
        this.wrapper = document.querySelector('.wrapper');
        this.form = form;
    }

    render() {
        const {
            modal,
            modalDialog,
            modalContent,
            modalHeader,
            modalTitle,
            modalCloseBtn,
            modalIconClose,
            modalBody,
            modalOverlay
        } = this.elements;

        modal.classList.add('modal-wrap');
        modalOverlay.classList.add('modal');
        modalDialog.classList.add('modal-dialog');
        modalContent.classList.add('modal-content');
        modalHeader.classList.add('modal-header');
        modalTitle.classList.add('login-form-header');
        modalBody.classList.add('modal-body');
        modalCloseBtn.classList.add('modal-btn')
        modalIconClose.classList.add('modal-btn__close-icon');

        modalIconClose.textContent = 'x';
        modalTitle.textContent = this.modalTitleText;

        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');
        modalCloseBtn.type = 'button';
        modalCloseBtn.setAttribute('aria-label', 'close');

        modal.addEventListener('click', (e) => {

            if (e.target === modalCloseBtn || e.target === modalOverlay) {
                this.close();
            }
        })

        this.form.render(modalBody);

        modalCloseBtn.append(modalIconClose);
        modalHeader.append(modalTitle, modalCloseBtn);
        modalContent.append(modalHeader, modalBody);
        modalDialog.append(modalContent)
        modal.append(modalDialog);
        modal.append(modalOverlay);
        document.body.prepend(modal);
    }

    open() {
        this.wrapper.classList.add('blur');
        this.render();
    }

    close() {
        const {modal} = this.elements;
        modal.remove();
        this.wrapper.classList.remove('blur');
    }
}