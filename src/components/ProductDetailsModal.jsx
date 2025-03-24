/* eslint react/prop-types: 0 */
import { Modal, Row, Col, Typography, Image } from "antd";

const { Title, Text, Paragraph } = Typography;

const ProductDetailsModal = ({ product, visible, onClose }) => {
  return (
    <Modal visible={visible} onCancel={onClose} footer={null} width={800}>
      <Row gutter={[24, 16]} justify={"center"}>
        <Col xs={24} md={12}>
          <Image
            src={product?.image}
            alt={product?.title}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="product-details">
            <Title level={4} className="mb-4">
              {product?.title}
            </Title>

            <div className="detail-item">
              <Text strong>Price:</Text>
              <Text className="ml-2">${product?.price}</Text>
            </div>

            <div className="detail-item">
              <Text strong>Dimensions:</Text>
              <Text className="ml-2">
                {product?.width} x {product?.height}
              </Text>
            </div>

            {product?.technique && (
              <div className="detail-item">
                <Text strong>Technique:</Text>
                <Text className="ml-2">{product?.technique}</Text>
              </div>
            )}

            {product?.description && (
              <div className="detail-item">
                <Text strong>Description:</Text>
                <Paragraph className="ml-2">{product?.description}</Paragraph>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ProductDetailsModal;
