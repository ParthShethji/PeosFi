import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const GlassCard = ({ onClose, onSuccess }) => {
  const [requestUrl, setRequestUrl] = useState('');
  const [proofs, setProofs] = useState(null);
  const [status, setStatus] = useState('');
  const [verificationComplete, setVerificationComplete] = useState(false);

  const handleVerificationSuccess = (proofs) => {
    if (proofs) {
      if (typeof proofs === 'string') {
        console.log('SDK Message:', proofs);
        setProofs(JSON.parse(proofs));
      } else {
        console.log('Proof received:', proofs);
        setProofs(proofs);
        setVerificationComplete(true);
        onSuccess?.(proofs);
      }
      setStatus('Proof received!');
    }
  };

  const generateVerificationRequest = async () => {
    try {
      const APP_ID = process.env.NEXT_RECLAIM_APP_ID;
      const APP_SECRET = process.env.NEXT_RECLAIM_APP_SECRET;
      const providerId = process.env.NEXT_RECLAIM_GMAIL_PROVIDER_ID;

      const reclaimClient = new Reclaim.ProofRequest(APP_ID);
      await reclaimClient.buildProofRequest(providerId);
      reclaimClient.setSignature(await reclaimClient.generateSignature(APP_SECRET));

      const { requestUrl, statusUrl } = await reclaimClient.createVerificationRequest();
      setRequestUrl(requestUrl);
      setStatus('Ready to start verification');

      await reclaimClient.startSession({
        onSuccessCallback: handleVerificationSuccess,
        onFailureCallback: (error) => {
          console.error('Verification failed', error);
          setStatus(`Error: ${error.message}`);
        }
      });
    } catch (error) {
      console.error('Setup failed', error);
      setStatus(`Setup failed: ${error.message}`);
    }
  };

  const renderProofTable = (proofData) => {
    if (!proofData) return null;

    const renderValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <Table>
            <TableBody>
              {Object.entries(value).map(([subKey, subValue]) => (
                <TableRow key={subKey}>
                  <TableCell className="font-medium">{subKey}</TableCell>
                  <TableCell>{String(subValue)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      }
      return String(value);
    };

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(proofData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell>{renderValue(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center justify-center w-[32rem] p-6 bg-white bg-opacity-20 rounded-xl shadow-lg backdrop-blur-md border border-white border-opacity-30">
        <h2 className="text-black text-2xl mb-4">Scan Here to Generate Proof</h2>
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-sm text-black mb-2">{status}</p>
          
          <div className="mb-4">
            {!requestUrl && (
              <button 
                className="px-6 py-2 text-lg text-black bg-white bg-opacity-30 rounded-lg hover:bg-opacity-50 transition-opacity duration-300" 
                onClick={generateVerificationRequest}
              >
                Fetch Gmail ID
              </button>
            )}
            {requestUrl && !verificationComplete && (
              <div className="space-y-4">
                <QRCodeSVG value={requestUrl} size={160} />
              </div>
            )}
          </div>

            <div>
                hello
            </div>

          {proofs && (
            <div className="w-full mt-4 bg-white bg-opacity-90 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-black">Verification Details</h4>
              {/* <div>Github Username: {proofs.response[0].claimData.context.extractedParameters.username}</div> */}
              {/* <div>Gmail ID: {proofs.response[0].claimData.context.extractedParameters.email}</div> */}
              {/* <div>Aadhaar Number: {proofs.response[0].claimData.context.extractedParameters.997618352305}</div> */}
              {/* <div>Aadhaar DOB: {proofs.response[0].claimData.context.extractedParameters.CLAIM_DATA}</div> */}
              <div className="overflow-auto max-h-60">
                {renderProofTable(proofs)}
                console.log("proofs", proofs)
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 text-lg text-black bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GlassCard; 