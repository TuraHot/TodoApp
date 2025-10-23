import { useState, useEffect, useCallback, useMemo } from 'react';

import fieldImage from '../assets/images/field.png';
import basketballImage from '../assets/images/basketball.png';
import footballImage from '../assets/images/football.png';
import volleyballImage from '../assets/images/volleyball.png';
import humanImage from '../assets/images/human.png';
import cartoonImage from '../assets/images/cartoon.png';

const FIELD_WIDTH = 600;
const FIELD_HEIGHT = 400;
const BALL_DIAMETER = 50;
const BORDER_WIDTH = 1; 
const VX = 5;
const VY = 5;

const MAX_X = FIELD_WIDTH - BALL_DIAMETER - (2 * BORDER_WIDTH); 
const MAX_Y = FIELD_HEIGHT - BALL_DIAMETER - (2 * BORDER_WIDTH);

const IMAGE_MAP = {
    'none': 'orange',
    'basketball': basketballImage,
    'football': footballImage,
    'volleyball': volleyballImage,
    'human': humanImage,
    'cartoon': cartoonImage,
};

function AnimationComponent() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [goRight, setGoRight] = useState(true);
    const [goDown, setGoDown] = useState(true);
    const [isRun, setIsRun] = useState(false);

    const [buttonSelected, setButtonSelected] = useState('none');

    const calculate = useCallback(() => {
        setX(prevX => {
            let newX = prevX + (goRight ? VX : -VX);
            if (newX >= MAX_X) {
                newX = MAX_X;
                setGoRight(false);
            } else if (newX <= 0) {
                newX = 0;
                setGoRight(true);
            }
            return newX;
        });

        setY(prevY => {
            let newY = prevY + (goDown ? VY : -VY);
            if (newY >= MAX_Y) {
                newY = MAX_Y;
                setGoDown(false);
            } else if (newY <= 0) {
                newY = 0;
                setGoDown(true);
            }
            return newY;
        });
    }, [goRight, goDown]);

    useEffect(() => {
        let intervalId;

        if (isRun) {
            intervalId = setInterval(calculate, 20);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isRun, calculate]); 

    useEffect(() => {
        const checkKeyboard = (event) => {
            if (event.key >= "0" && event.key <= "5") {
                const keyMap = ['none', 'basketball', 'football', 'volleyball', 'human', 'cartoon'];
                const key = Number(event.key);
                setButtonSelected(keyMap[key]);
            } else if (event.key === " ") {
                event.preventDefault(); 
                setIsRun(prevIsRun => !prevIsRun);
            }
        };

        document.addEventListener('keydown', checkKeyboard);
        return () => {
            document.removeEventListener('keydown', checkKeyboard);
        };
    }, []); 

    const handleRunClick = () => {
        setIsRun(prevIsRun => !prevIsRun);
    };

    const handleBallSelection = (key) => {
        setButtonSelected(key);
    };

    const ballStyle = useMemo(() => {
        const isNone = buttonSelected === 'none';
        
        const imagePath = IMAGE_MAP[buttonSelected]; 

        return {
            width: `${BALL_DIAMETER}px`,
            height: `${BALL_DIAMETER}px`,
            borderRadius: '50%',
            border: `${BORDER_WIDTH}px solid black`,
            position: 'absolute', 
            left: `${x}px`,
            top: `${y}px`,
            backgroundColor: isNone ? imagePath : 'transparent',
            backgroundImage: isNone ? 'none' : `url(${imagePath})`,
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
        };
    }, [x, y, buttonSelected]);

    return (
        <div className="container p-4" style={{ width: 'fit-content' }}>
            <div>
                <div 
                    id="field" 
                    className="border border-black rounded-2 overflow-hidden position-relative"
                    style={{
                        width: `${FIELD_WIDTH}px`,
                        height: `${FIELD_HEIGHT}px`,
                        backgroundImage: `url(${fieldImage})`, 
                        backgroundPosition: 'center',
                        backgroundSize: 'cover', 
                        borderWidth: `${BORDER_WIDTH}px`
                    }}
                >
                    <div 
                        id="ball" 
                        style={ballStyle}
                    ></div>
                </div>

                <div className="d-flex justify-content-around align-items-center mt-3 bg-light rounded">
                    <button 
                        className={`btn ${isRun ? 'btn-danger' : 'btn-success'} d-flex align-items-center`} 
                        onClick={handleRunClick}
                    >
                        {isRun ? <i className="bi bi-pause-fill me-1"></i> : <i className="bi bi-play-fill me-1"></i>}
                        {isRun ? 'Pause' : 'Run'}
                    </button>

                    <div className="btn-group gap-2" role="group">
                        {Object.keys(IMAGE_MAP).map((key, index) => (
                            <button
                                key={key}
                                id={key}
                                className={`btn btn-sm rounded-1 ${key === buttonSelected ? 'btn-primary' : (key === 'none' ? 'btn-secondary' : 'btn-outline-primary')}`}
                                onClick={() => handleBallSelection(key)}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnimationComponent;