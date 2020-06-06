import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
};

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    const [selectedFileURL, setSelectedFileURL] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileURL = URL.createObjectURL(file);

        setSelectedFileURL(fileURL);
        onFileUploaded(file);
    }, [onFileUploaded]);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div className='dropzone' {...getRootProps()}>
            <input {...getInputProps()} accept='image/*' />

            {
                selectedFileURL
                    ?   <img
                            src={selectedFileURL}
                            alt='Collection point thumbnail'
                        />
                    :   (
                        isDragActive ?
                    <p>Solte a imagem aqui...</p> :
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento<br />
                        Arraste uma imagem aqui
                        ou clique para selecionar um arquivo
                    </p>
                    )
            }

            {
                
            }
        </div>
    )
}

export default Dropzone;
