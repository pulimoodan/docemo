import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={`${styles.footer} bg-light`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <p className="text-muted small mb-4 mb-lg-0">&copy; Windows server support. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}