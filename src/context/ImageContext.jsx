import { createContext } from "react";
import { useContext,useState } from "react";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [image, setImage] = useState(null);
    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => {
    const context = useContext(ImageContext);
    if (context === undefined) {
         return('useImage must be used within an ImageProvider');
    }
    return context;
};
