import React from 'react'

function Fotter() {
    return (
        <footer className="footer_area clearfix">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <p className="copywrite">
                            Copyright &copy;<script>document.write(new Date().getFullYear());</script> Todos os direitos reservados
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Fotter