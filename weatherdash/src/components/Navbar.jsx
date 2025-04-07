const NavBar = () => {
  return (
    <nav className="navbar">
      <h2 className="nav-title">☁️ WeatherDash</h2>
      <ul>
        <li><button>📊 Dashboard</button></li>
        <li><button>🔍 Search</button></li>
        <li><button>ℹ️ About</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
