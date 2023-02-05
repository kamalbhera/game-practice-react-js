import { useState, useEffect } from "react";

const array = 6;

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 500);
    });
}

export default function App() {
    const [squaresClicked, setSquaresClicked] = useState([]);

    useEffect(() => {
        async function removeLastItem(currentArray) {
            if (currentArray.length === 0) {
                return;
            }
            const lastIndexToRemove = currentArray.length - 1;
            const newArray = [
                ...currentArray.slice(0, lastIndexToRemove),
                ...currentArray.slice(lastIndexToRemove + 1),
            ];
            console.log(newArray);
            await delay();
            setSquaresClicked(newArray);
            removeLastItem(newArray);
        }
        if (squaresClicked.length === array) {
            console.log("we clicked all squares ");
            removeLastItem(squaresClicked);
        }
        // console.log(squaresClicked.length)
    }, [squaresClicked]);

    const onClickSquare = (index) => {
        if (squaresClicked.includes(index) || squaresClicked.length === array)
            return;
        setSquaresClicked([...squaresClicked].concat(index));
    };
    console.log(squaresClicked);
    return (
        <>
            {[...Array(array)].map((_, index) => (
                <Square
                    key={index}
                    index={index}
                    onClickSquare={onClickSquare}
                    backgroundColor={
                        squaresClicked.includes(index) ? "green" : "white"
                    }
                />
            ))}
        </>
    );
}

function Square({ index, backgroundColor, onClickSquare }) {
    return (
        <>
            <div
                onClick={() => onClickSquare(index)}
                style={{
                    border: "1px solid black",
                    width: "50px",
                    height: "50px",
                    backgroundColor,
                }}
            ></div>
        </>
    );
}
