import moment from 'moment';

// random color generator

export const getRandomColor = () => {

    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for(let i = 0; i < 6; i++){

        color += letters[Math.floor(Math.random() * 16)];
    };

    return color;
};


// finding date
export const findDate = time => moment(time).format('MM/DD/YYYY');

// finding time
export const findTime = time => moment(time).format('HH:MM');

// splits HH:MM string to retrive hour or minute 
const retrivePart = (time, minute = true) => +(time.split(':')[+minute]);

// takes two HH:MM-HH:MM time ranges and checks whether they collide or not
export const isTimeColliding = (t1, t2) => {

    const [t1Start, t1End] = t1.split('-');
    const [t2Start, t2End] = t2.split('-');


    let secondTimeSmaller = retrivePart(t1Start, false) > retrivePart(t2End, false);
    let secondTimeGreater = retrivePart(t1End, false) < retrivePart(t2Start, false);

    if(retrivePart(t1Start, false) === retrivePart(t2End, false)){
        secondTimeSmaller = retrivePart(t1Start) > retrivePart(t2End);
    };
    if(retrivePart(t1End, false) === retrivePart(t2Start, false)){
        secondTimeGreater = retrivePart(t1End) < retrivePart(t2Start);
    }

    return !(secondTimeGreater || secondTimeSmaller);
};