import React from "react";
import { Card, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import testimonialsData from "./testimonials.js";

const { Title, Paragraph, Text } = Typography;

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-br from-slate-100 via-slate-200 to-teal-100 py-24 px-4">
      <div className="text-center mb-16">
        <Title level={2} className="!text-slate-800 !font-extrabold text-4xl">
          What People Are Saying
        </Title>
        <Paragraph className="text-slate-500 text-lg max-w-2xl mx-auto">
          Real feedback from real people who’ve experienced the difference.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} justify="center">
        {testimonialsData.map((testimonial) => (
          <Col
            key={testimonial.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            className="flex justify-center"
          >
            <Card
              hoverable
              bordered={false}
              className="w-full max-w-sm !rounded-2xl !bg-white !shadow-lg"
            >
              <div className="flex flex-col items-center text-center px-4 py-2">
                <Avatar
                  size={80}
                  src={testimonial.image}
                  icon={!testimonial.image && <UserOutlined />}
                  className="mb-4"
                />
                <Paragraph className="text-gray-700 text-base italic leading-relaxed mb-3">
                  “{testimonial.message}”
                </Paragraph>
                <Text className="text-teal-600 font-semibold text-lg">
                  {testimonial.name}
                </Text>
                <Text type="secondary" className="block text-sm mt-1">
                  {testimonial.position}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Testimonials;
