import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}
