import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/layout";
import axios from "axios";
import { server } from "../../main";
import { Card, Col, Row, Statistic, Spin } from "antd";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Redirect if not admin
  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch the stats
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: { token: localStorage.getItem("token") },
      });
      setStats(data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="bg-gradient-to-t from-slate-50 to-teal-100 min-h-screen">
      <Layout>
        <div className="flex flex-col items-center mt-16 space-y-10">
          {loading ? (
            <Spin size="large" />
          ) : (
            <Row gutter={[16, 16]} className="w-full">
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl rounded-lg"
                  hoverable
                  title="Total Courses"
                  bordered={false}
                >
                  <Statistic
                    value={stats.totalCourses}
                    precision={0}
                    valueStyle={{ fontSize: "36px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl rounded-lg"
                  hoverable
                  title="Total Lectures"
                  bordered={false}
                >
                  <Statistic
                    value={stats.totalLectures}
                    precision={0}
                    valueStyle={{ fontSize: "36px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card
                  className="shadow-xl rounded-lg"
                  hoverable
                  title="Total Users"
                  bordered={false}
                >
                  <Statistic
                    value={stats.totalUsers}
                    precision={0}
                    valueStyle={{ fontSize: "36px", fontWeight: "bold" }}
                  />
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
