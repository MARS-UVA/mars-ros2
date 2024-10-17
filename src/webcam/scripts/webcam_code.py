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
    def __init__(self):
        super().__init__("webcam") # Calling parents class to assign node name 
        self.publisher_ = self.create_publisher(Image, 'webcam_image', 10)
        self.cap = cv2.VideoCapture(0)
        self.bridge = CvBridge()
    def publish_frame(self):
        ret, frame = self.cap.read()
        if ret:
            img_msg = self.bridge.cv2_to_imgmsg(frame, encoding='bgr8')
            self.publisher_.publish(img_msg)
    def destroy_node(self):
        super().destroy_node()# Release the video capture on node destruction
        self.cap.release()
# Main method is the first point of entry which instantiates an instance of the WebcamSubscriber class (a child of the Node class)
def main(args=None):
    rclpy.init()
    node = Webcam()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == "__main__":
    main()
