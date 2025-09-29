const Footer = () => {
    return (
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} TechSphere.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;