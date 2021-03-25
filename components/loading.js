import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="container">
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
            </div>

            <style jsx>{`
                .container{
                    background: rgba(0, 0, 0, .8);
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 100;
                }
                .spinner {
                    position: relative;
                    top: -60px;
                    width: 100%;
                    text-align: center;
                    height: 100px;
                }
                .spinner > div {
                    background-color: white;
                    height: 100%;
                    width: 8px;
                    display: inline-block;
                    animation: sk-stretchdelay 1.2s infinite ease-in-out;
                }
                .spinner .rect2 {
                    animation-delay: -1.1s;
                    margin-left: 3px;
                }
                .spinner .rect3 {
                    animation-delay: -1.0s;
                    margin-left: 3px;
                }
                .spinner .rect4 {
                    animation-delay: -0.9s;
                    margin-left: 3px;
                }
                .spinner .rect5 {
                    animation-delay: -0.8s;
                    margin-left: 3px;
                }

                @keyframes sk-stretchdelay {
                    0%, 40%, 100% { 
                        transform: scaleY(0.4);
                    }  20% { 
                        transform: scaleY(1.0);
                    }
                }
            `}</style>
        </div>
    );
}

export default Loading;
