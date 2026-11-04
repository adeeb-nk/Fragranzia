
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdInventory2,
  MdCategory,
  MdLocalOffer,
  MdPeople,
  MdShoppingCart,
  MdLogout
} from "react-icons/md";

import {
  FiDollarSign,
  FiPackage,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
  FiClock,
  FiArrowUpRight,
  FiActivity
} from "react-icons/fi";

import AdminService from "../../services/admin-api-services/AdminService";
import "./Dashboard.css";

const Dashboard = ({ onLogout }) => {

  const {
    getOrder,
    getProduct,
    fetchUser,
    getCategory
  } = AdminService();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract arrays from API responses
  const getArray = (response, keys = []) => {
    if (Array.isArray(response)) return response;

    for (const key of keys) {
      if (Array.isArray(response?.[key])) {
        return response[key];
      }
    }

    return [];
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [
        orderResponse,
        productResponse,
        userResponse,
        categoryResponse
      ] = await Promise.all([
        getOrder(),
        getProduct(),
        fetchUser(),
        getCategory()
      ]);

      setOrders(
        getArray(orderResponse, ["orders", "data"])
      );

      setProducts(
        getArray(productResponse, ["products", "data"])
      );

      setUsers(
        getArray(userResponse, ["users", "data"])
      );

      setCategories(
        getArray(categoryResponse, ["categories", "data"])
      );

    } catch (error) {
      console.error(
        "Dashboard fetching error:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Exclude cancelled orders from sales calculations
  const validOrders = orders.filter(
    order => order.deliveryStatus !== "Cancelled"
  );

  // Total sales
  const totalSales = validOrders.reduce(
    (total, order) => total + Number(order.totalPrice || 0),
    0
  );

  // Average order value
  const averageOrder = validOrders.length
    ? totalSales / validOrders.length
    : 0;

  // Unique customers from orders as a fallback
  const uniqueCustomerIds = new Set(
    orders
      .map(order => order.user?._id || order.user)
      .filter(Boolean)
      .map(id => String(id))
  );

  const customerCount = users.length || uniqueCustomerIds.size;

  // Weekly order data
  const getWeeklyData = () => {
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      const count = orders.filter(order => {
        const orderDate = new Date(order.createdAt);

        return (
          !Number.isNaN(orderDate.getTime()) &&
          orderDate >= date &&
          orderDate < nextDate
        );
      }).length;

      result.push({
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short"
        }),
        count
      });
    }

    return result;
  };

  const weeklyData = getWeeklyData();

  // Sales by category
  const categorySales = {};

  validOrders.forEach(order => {
    order.orderItems?.forEach(item => {
      const product = item.product;

      if (!product) return;

      const categoryValue =
        product.category?.name ||
        product.category?.categoryName ||
        product.categoryName ||
        product.category ||
        "Other";

    //   const categoryName =
    //     typeof categoryValue === "string"
    //       ? categoryValue
    //       : "Other";

    const categoryName =
    categories.find(
        cat => cat._id === product.category
    )?.name || "Other";

      const price = Number(
        product.sale_price || product.price || 0
      );

      const quantity = Number(item.quantity || 0);

      categorySales[categoryName] =
        (categorySales[categoryName] || 0) +
        price * quantity;
    });
  });

  const categoryData = Object.entries(categorySales)
    .map(([name, sales]) => ({ name, sales }))
    .sort((a, b) => b.sales - a.sales);

  const totalCategorySales = categoryData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const categoryColors = [
    "#5685e9",
    "#35b58b",
    "#a779e9",
    "#f0a34a",
    "#e76c83"
  ];

  const donutGradient = categoryData.length
    ? (() => {
        let current = 0;

        const segments = categoryData.map((item, index) => {
          const percentage = totalCategorySales
            ? (item.sales / totalCategorySales) * 100
            : 0;

          const start = current;
          current += percentage;

          return `${categoryColors[index % categoryColors.length]} ${start}% ${current}%`;
        });

        return `conic-gradient(${segments.join(", ")})`;
      })()
    : "#e9edf2";

  // Recent orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  // Weekly chart SVG coordinates
  const chartWidth = 650;
  const chartHeight = 210;
  const chartPadding = 25;

  const maxOrders = Math.max(
    ...weeklyData.map(item => item.count),
    1
  );

  const points = weeklyData.map((item, index) => {
    const x =
      chartPadding +
      index * (
        (chartWidth - chartPadding * 2) /
        Math.max(weeklyData.length - 1, 1)
      );

    const y =
      chartHeight -
      chartPadding -
      (item.count / maxOrders) *
        (chartHeight - chartPadding * 2);

    return `${x},${y}`;
  }).join(" ");

  const firstPoint = points.split(" ")[0];
  const lastPoint = points.split(" ").slice(-1)[0];

  return (
    <div className="frag-dashboard">

      {/* SIDEBAR */}

      <aside className="frag-sidebar">

        <div className="frag-logo">
          <h2>FRAGRANZIA</h2>
          <span>ADMIN PANEL</span>
        </div>

        <nav className="frag-navigation">

          <p className="frag-nav-label">MAIN MENU</p>

          <ul>

            <li className="active">
              <MdDashboard />
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li>
              <MdInventory2 />
              <Link to="/Productadmin1">Products</Link>
            </li>

            <li>
              <MdCategory />
              <Link to="/Category">Categories</Link>
            </li>

            <li>
              <MdLocalOffer />
              <Link to="/Offer">Offers</Link>
            </li>

            <li>
              <MdPeople />
              <Link to="/User">Customers</Link>
            </li>

            <li>
              <MdShoppingCart />
              <Link to="/Order">Orders</Link>
            </li>

          </ul>

        </nav>

        <div className="frag-sidebar-bottom">

          <div className="frag-admin-profile">
            <div className="frag-admin-avatar">F</div>
            <div>
              <h4>Admin</h4>
              <p>Store Manager</p>
            </div>
          </div>

          <button
            className="frag-logout"
            onClick={onLogout}
          >
            <MdLogout />
            Log Out
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}

      <main className="frag-main">

        {/* HEADER */}

        <header className="frag-header">

          <div>
            <p className="frag-header-small">
              FRAGRANZIA / OVERVIEW
            </p>

            <h1>Dashboard</h1>

            <p className="frag-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>

          <div className="frag-system-status">
            <FiActivity />
            System Status: Online
          </div>

        </header>


        {loading ? (

          <div className="frag-loading">
            Loading Dashboard...
          </div>

        ) : (

          <>

            {/* STATISTICS CARDS */}

            <section className="frag-stats">

              <div className="frag-stat-card">

                <div className="frag-stat-info">
                  <p>TOTAL SALES</p>

                  <h2>
                    ₹{totalSales.toLocaleString("en-IN", {
                      maximumFractionDigits: 0
                    })}
                  </h2>

                  <span className="stat-green">
                    <FiTrendingUp />
                    Store Revenue
                  </span>
                </div>

                <div className="frag-stat-icon sales-icon">
                  <FiDollarSign />
                </div>

              </div>


              <div className="frag-stat-card">

                <div className="frag-stat-info">
                  <p>TOTAL ORDERS</p>

                  <h2>{orders.length}</h2>

                  <span className="stat-blue">
                    <FiShoppingBag />
                    AOV: ₹{averageOrder.toFixed(0)}
                  </span>
                </div>

                <div className="frag-stat-icon orders-icon">
                  <FiShoppingBag />
                </div>

              </div>


              <div className="frag-stat-card">

                <div className="frag-stat-info">
                  <p>PRODUCTS</p>

                  <h2>{products.length}</h2>

                  <span className="stat-purple">
                    <FiPackage />
                    Live in Catalog
                  </span>
                </div>

                <div className="frag-stat-icon products-icon">
                  <FiPackage />
                </div>

              </div>


              <div className="frag-stat-card">

                <div className="frag-stat-info">
                  <p>CUSTOMERS</p>

                  <h2>{customerCount}</h2>

                  <span className="stat-orange">
                    <FiUsers />
                    Registered Accounts
                  </span>
                </div>

                <div className="frag-stat-icon customers-icon">
                  <FiUsers />
                </div>

              </div>

            </section>


            {/* CHART SECTION */}

            <section className="frag-chart-section">

              {/* WEEKLY ORDERS */}

              <div className="frag-chart-card weekly-card">

                <div className="frag-card-heading">
                  <div>
                    <h3>Weekly Orders Overview</h3>
                    <p>Order activity during the last 7 days</p>
                  </div>

                  <span className="frag-realtime">
                    <FiActivity />
                    Realtime Data
                  </span>
                </div>

                <div className="frag-line-chart">

                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    preserveAspectRatio="none"
                  >

                    {[0, 1, 2, 3].map((value) => {
                      const y =
                        chartPadding +
                        value *
                          ((chartHeight - chartPadding * 2) / 3);

                      return (
                        <line
                          key={value}
                          x1={chartPadding}
                          y1={y}
                          x2={chartWidth - chartPadding}
                          y2={y}
                          stroke="#e9edf2"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    {weeklyData.length > 1 && (
                      <polygon
                        points={`${firstPoint} ${points} ${lastPoint.split(",")[0]},${chartHeight - chartPadding} ${firstPoint.split(",")[0]},${chartHeight - chartPadding}`}
                        fill="rgba(91, 85, 224, 0.08)"
                      />
                    )}

                    <polyline
                      points={points}
                      fill="none"
                      stroke="#6257df"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {weeklyData.map((item, index) => {
                      const point = points.split(" ")[index];
                      const [x, y] = point.split(",");

                      return (
                        <circle
                          key={index}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#6257df"
                          stroke="white"
                          strokeWidth="2"
                        />
                      );
                    })}

                  </svg>

                </div>

                <div className="frag-chart-labels">

                  {weeklyData.map((item, index) => (
                    <div key={index}>
                      <span>{item.date}</span>
                      <strong>{item.count}</strong>
                    </div>
                  ))}

                </div>

              </div>


              {/* CATEGORY SALES */}

              <div className="frag-chart-card category-card">

                <div className="frag-card-heading">
                  <div>
                    <h3>Sales by Category</h3>
                    <p>Revenue distribution</p>
                  </div>
                </div>

                <div
                  className="frag-donut"
                  style={{
                    background: donutGradient
                  }}
                >
                  <div className="frag-donut-center">
                    <span>Total Sales</span>
                    <h3>
                      ₹{totalCategorySales.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                      })}
                    </h3>
                  </div>
                </div>

                <div className="frag-category-legend">

                  {categoryData.length === 0 ? (
                    <p>No category sales available</p>
                  ) : (
                    categoryData.map((item, index) => (
                      <div
                        className="frag-legend-item"
                        key={item.name}
                      >
                        <span
                          className="frag-legend-dot"
                          style={{
                            background:
                              categoryColors[
                                index % categoryColors.length
                              ]
                          }}
                        />

                        <span>{item.name}</span>

                        <strong>
                          {totalCategorySales
                            ? (
                                item.sales /
                                totalCategorySales *
                                100
                              ).toFixed(0)
                            : 0}%
                        </strong>
                      </div>
                    ))
                  )}

                </div>

              </div>

            </section>


            {/* RECENT ORDERS */}

            <section className="frag-recent-card">

              <div className="frag-recent-heading">

                <div>
                  <h3>Recent Orders</h3>
                  <p>Latest customer purchases</p>
                </div>

                <Link to="/Order">
                  View All Orders
                  <FiArrowUpRight />
                </Link>

              </div>


              <div className="frag-table-wrapper">

                <table className="frag-recent-table">

                  <thead>
                    <tr>
                      <th>ORDER ID</th>
                      <th>CUSTOMER</th>
                      <th>DATE</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>

                    {recentOrders.length === 0 ? (

                      <tr>
                        <td colSpan="5" className="frag-empty">
                          No orders found
                        </td>
                      </tr>

                    ) : (

                      recentOrders.map(order => (

                        <tr key={order._id}>

                          <td className="frag-order-id">
                            #{order._id?.slice(-8).toUpperCase()}
                          </td>

                          <td>
                            {order.user?.name ||
                              order.user?.username ||
                              "Customer"}
                          </td>

                          <td>
                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString("en-IN")
                              : "N/A"}
                          </td>

                          <td className="frag-amount">
                            ₹{Number(
                              order.totalPrice || 0
                            ).toLocaleString("en-IN")}
                          </td>

                          <td>
                            <span
                              className={`frag-status ${(
                                order.deliveryStatus || "Pending"
                              )
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                            >
                              {order.deliveryStatus || "Pending"}
                            </span>
                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </section>

          </>

        )}

      </main>

    </div>
  );
};

export default Dashboard;
