import React, { useState } from 'react';
import axios from 'axios';

function ClusterManager(){
    const [kubeConfig,setKubeConfig]=useState('');

    const handleKubeConfigChange = (e)=>{
        setKubeConfig(e.target.value);
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('kubeConfigContent',kubeConfig);
       

        try {
            const response = await axios.post('http://localhost:8080/clusters',formData,{
                Headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading kubeconfig:',error);
            // deal wrongs
        }
    };

    return (
        
        <div className='cluster-manager'>
            <h1>KubeCommander</h1>
            <form onSubmit={handelSubmit} className='kubeconfig-form'>
                <textarea
                    className='kubeconfig-textarea'
                    placeholder='Paste kubeconfig here'
                    value={kubeConfig}
                    onChange={handleKubeConfigChange}
                />
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
    );
}

export default ClusterManager;
