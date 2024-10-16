#!/usr/bin/env python3

# ROS Python Libraries
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image

# OpenCV imports, use 'pip install opencv-python' to get OpenCV for Python
from cv_bridge import CvBridge
import cv2

# Webcam Subscriber node which inherits the Node parent class from rclpy
class Webcam(Node):
    def __init__(self) -> None:
        super().__init__("webcam") # Calling parents class to assign node name 
        #self.get_logger().info("webcam init")
        self.publisher_ = self.create_publisher(Image, 'transformed_image_topic', 10)
        self.imageSubscription = self.create_subscription(
            Image,
            'webcam_topic',
            self.image_callback,
            10
        )
        self.bridge = CvBridge()  #Instantiating a CVBridge instance

    #Callback function called when a message is ready to be processed from the subscriber queue
    def listener_callback(self, msg):
        cv_image = self.bridge.imgmsg_to_cv2(msg, desired_encoding='bgr8')  #Convert image to OpenCV matrix

        cv2.imshow("Image", cv_image)
        cv2.waitKey(1)
    
# Main method is the first point of entry which instantiates an instance of the WebcamSubscriber class (a child of the Node class)
def main(args=None):
    rclpy.init()
    node = WebcamSubscriber()
    rclpy.spin(node)
    cv2.destroyAllWindows()
    rclpy.shutdown()

if __name__ == "__main__":
    main()
