from setuptools import find_packages, setup

package_name = 'realsense_rgbd_node'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='ubuntu',
    maintainer_email='ubuntu@todo.todo',
    description='ROS 2 node for RealSense camera to publish RGBD data',
    license='Apache License 2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'realsense_rgbd_node = realsense_rgbd_node.realsense_rgbd_node:main'
        ],
    },
)
