import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Reclaim } from '@reclaimprotocol/js-sdk';

interface GlassCardProps {
  onClose: () => void;
  onSuccess: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ onClose, onSuccess }) => {
  const [url, setUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');

  const generateVerificationRequest = async () => {
    const APP_ID = "0x33e3d4d7f82d4faE2901bd42d8016b97490A6A22";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);
    const APP_SECRET = "0x0c2f4ed350aad1502891bc1f41ba25281d9e2eb7b4c189e77a940a4dd978fff6";

    const providerIds = [
      '39c31ffd-0be0-4e45-9a18-1eb3cb8099d4', // DSID Solana ID Twitter Verifier v2
      '5e1302ca-a3dd-4ef8-bc25-24fcc97dc800', // Aadhaar Card Date of Birth
      '285a345c-c6a6-4b9f-9e1e-23432082c0a8', // Coinbase Completed KYC
      '2b22db5c-78d9-4d82-84f0-a9e0a4ed0470', // Binance KYC Level
      '5c1738b0-0fa6-49d7-86be-d5fa28cc02a5', // Aadhaar Anon
      '70d5972a-3429-4d5a-9790-39ea646789ca', // Digilocker Based Aadhaar Details
      '89bec1a0-aa09-4300-b6fe-59e79872c490', // X.com Followers
      'a5f71e67-9ab6-4d2f-9e7d-27c1dfa398b7', // instadetails
      '1cd6a037-00a1-4249-9104-7cd594eb2e8f', // CAN ID 04.06
      
      // '39c31ffd-0be0-4e45-9a18-1eb3cb8099d4'
      '1bba104c-f7e3-4b58-8b42-f8c0346cdeab', // Steam ID
    ];
    
    await reclaimClient.buildProofRequest(providerIds[0]);
    reclaimClient.setSignature(await reclaimClient.generateSignature(APP_SECRET));

    const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();
    setUrl(requestUrl);
    setStatusUrl(statusUrl);

    // Start session and handle the proof
    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof);
        const data = proof;
        console.log(data);
        onSuccess();
      },
      onFailureCallback: error => {
        console.error('Verification failed', error);
      }
    });

    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center w-80 h-96 p-6 bg-white bg-opacity-20 rounded-xl shadow-lg backdrop-blur-md border border-white border-opacity-30">
        <h2 className="text-white text-2xl mb-4">Scan Here to Generate Proof</h2>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            {!url && (
              <button className="px-6 py-2 text-lg text-white bg-white bg-opacity-30 rounded-lg hover:bg-opacity-50 transition-opacity duration-300" onClick={generateVerificationRequest}>
                Create Claim QR Code
              </button>
            )}
            {url && (
              <QRCode value={url} size={160}/>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-lg text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlassCard;
