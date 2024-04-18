export default function Address({ address }: { address: string }) {
  return (
    <p>
      {address.substring(0, 4)}...
      {address.substring(address.length - 4, address.length)}
    </p>
  );
}
