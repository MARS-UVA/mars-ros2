import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, PointCloud2

class RealSenseRGBDNode(Node):
    def __init__(self):
        super().__init__('realsense_rgbd_node')

        self.get_logger().info('RealSense RGBD Node has started')

        self.rgb_pub = self.create_publisher(Image, '/camera/rgb/image_raw', 10)
        self.depth_pub = self.create_publisher(Image, '/camera/depth/image_raw', 10)
        self.pointcloud_pub = self.create_publisher(PointCloud2, '/camera/depth/color/points', 10)

        self.realsense_sub = self.create_subscription(
            Image,
            '/camera/color/image_raw',
            self.realsense_callback,
            10
        )
        self.get_logger().info('Subscribed to /camera/color/image_raw')

    def realsense_callback(self, msg):
        self.get_logger().info('Received RGB image data')

        self.rgb_pub.publish(msg)
        self.get_logger().info('Published RGB image to /camera/rgb/image_raw')

        self.depth_pub.publish(msg)  
        self.get_logger().info('Published depth image to /camera/depth/image_raw')

        pointcloud_msg = PointCloud2()  # Placeholder for actual point cloud data
        self.pointcloud_pub.publish(pointcloud_msg)
        self.get_logger().info('Published point cloud to /camera/depth/color/points')

def main(args=None):
    rclpy.init(args=args)
    node = RealSenseRGBDNode()

    node.get_logger().info('RealSense RGBD Node is spinning...')
    rclpy.spin(node)

    node.get_logger().info('Shutting down RealSense RGBD Node...')
    rclpy.shutdown()

if __name__ == '__main__':
    main()
