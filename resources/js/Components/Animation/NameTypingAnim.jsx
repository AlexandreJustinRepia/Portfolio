import { TypeAnimation } from 'react-type-animation';

export default function NameTypingAnim(){
    return(
        <h1 className="text-4xl md:text-6xl font-bold text-red-500 leading-tight font-code">
            <TypeAnimation
                sequence={[
                'Alexandre Justin Repia', // text to type
                2000, // wait 1 second
                '', // clear text
                500, // wait half a second
                'Alexandre Justin Repia', // type again (loop)
                ]}
                speed={70}
                repeat={Infinity}
            />
        </h1>
    );
}