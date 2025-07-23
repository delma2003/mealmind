const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <nav>
        <ul className="space-y-4">
          <li><a href="#" className="text-gray-700 hover:text-black">Dashboard</a></li>
          <li><a href="#" className="text-gray-700 hover:text-black">Meal Planner</a></li>
          <li><a href="#" className="text-gray-700 hover:text-black">Pantry</a></li>
          <li><a href="#" className="text-gray-700 hover:text-black">Settings</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
