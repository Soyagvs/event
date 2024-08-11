import { ImageProvider } from '@/context/ImageContext';

export default function App({ Component, pageProps }) {
    return (
        <ImageProvider>
            <Component {...pageProps} />
        </ImageProvider>
    );
}
