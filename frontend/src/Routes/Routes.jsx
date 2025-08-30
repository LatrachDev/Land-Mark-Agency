import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import ServicesPage from '../pages/ServicesPage';
import Blog from '../pages/Blog';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/ContactPage';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { LOGIN_PATH, DASHBOARD_PATH, ADMIN_TEAM, ADMIN_INBOX, ADMIN_PROJECTS, ADMIN_BLOG, ADMIN_CONTENT, ADMIN_SERVICES } from '../config/routes';
import TeamPage from '../pages/TeamPage';
import ProjectsPage from '../pages/ProjectsPage';
import ContentPage from '../pages/ContentPage';
import BlogPage from '../pages/BlogPage';
import InboxPage from '../pages/InboxPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import ServicesController from '../pages/ServicesController';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import HiddenLinks from '../pages/HiddenLinks';

function RoutesList() {
  // console.log("login path", LOGIN_PATH, DASHBOARD_PATH);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetailPage />} />
      <Route path="/services/:id" element={<ServiceDetailPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/espace-non-reference" element={<HiddenLinks />} />

      <Route path={LOGIN_PATH} element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path={DASHBOARD_PATH} element={<Dashboard />} />
        <Route path={ADMIN_TEAM} element={<TeamPage />} />
        <Route path={ADMIN_PROJECTS} element={<ProjectsPage />} />
        <Route path={ADMIN_CONTENT} element={<ContentPage />} />
        <Route path={ADMIN_BLOG} element={<BlogPage />} />
        <Route path={ADMIN_INBOX} element={<InboxPage />} />
        <Route path={ADMIN_INBOX} element={<InboxPage />} />
        <Route path={ADMIN_SERVICES} element={<ServicesController />} />
      </Route>

      {/* 404 Not Found route */}
      <Route path="*" element={<NotFound />} />
    
    </Routes>
  );
}

export default RoutesList;
