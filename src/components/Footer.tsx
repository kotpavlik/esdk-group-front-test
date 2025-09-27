import { Row } from 'antd'
import { Col } from 'antd'
import { Typography } from 'antd'
import { Space } from 'antd'
import {
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined
} from '@ant-design/icons'
import Map from './Map'

const { Title, Text, Paragraph } = Typography

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-700 to-purple-900 text-white rounded-t-3xl relative z-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Row gutter={[32, 32]}>
                    {/* Информация о компании */}
                    <Col xs={24} sm={12} lg={6}>
                        <div className="mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 bg-telegram-blue rounded-full flex items-center justify-center">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <Title type='secondary' level={3} className=" mb-0 ">
                                    ESDK Group
                                </Title>
                            </div>
                            <Paragraph type='secondary' className="text-gray-300 mb-4">
                                Ведущая IT-компания, специализирующаяся на разработке современных
                                веб-приложений и мобильных решений. Мы создаем цифровые продукты,
                                которые меняют мир к лучшему.
                            </Paragraph>
                            <div className="flex space-x-4">
                                <FacebookOutlined className="text-2xl  cursor-pointer transition-colors" />
                                <TwitterOutlined className="text-2xl  cursor-pointer transition-colors" />
                                <InstagramOutlined className="text-2xl  cursor-pointer transition-colors" />
                                <LinkedinOutlined className="text-2xl  cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </Col>

                    {/* Контактная информация */}
                    <Col xs={24} sm={12} lg={6}>
                        <Title type='secondary' level={4} className="mb-6">
                            📞 Контакты
                        </Title>
                        <Space direction="vertical" size="large" className="w-full">
                            <div className="flex items-start space-x-3">
                                <EnvironmentOutlined className="text-telegram-blue text-xl mt-1" />
                                <div>
                                    <Text type='secondary' className=" block">Адрес:</Text>
                                    <Text type='secondary' className="">ул. Независимости, 95</Text>
                                    <Text type='secondary' className=" block">Минск, Беларусь 220005</Text>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <PhoneOutlined className="text-telegram-blue text-xl" />
                                <div>
                                    <Text type='secondary' className=" block">Телефон:</Text>
                                    <Text type='secondary' className="">+375 29 123-45-67</Text>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <MailOutlined className="text-telegram-blue text-xl" />
                                <div>
                                    <Text type='secondary' className=" block">Email:</Text>
                                    <Text type='secondary' className="">info@esdkgroup.by</Text>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <GlobalOutlined className="text-telegram-blue text-xl" />
                                <div>
                                    <Text type='secondary' className="">Сайт:</Text>
                                    <Text type='secondary' className="">www.esdkgroup.by</Text>
                                </div>
                            </div>
                        </Space>
                    </Col>

                    {/* Услуги */}
                    <Col xs={24} sm={12} lg={6}>
                        <Title type='secondary' level={4} className="text-white mb-6">
                            🛠️ Услуги
                        </Title>
                        <Space direction="vertical" size="middle" className="w-full">
                            <Text type='secondary' className=" cursor-pointer transition-colors">
                                💻 Веб-разработка
                            </Text>
                            <Text type='secondary' className=" cursor-pointer transition-colors">
                                📱 Мобильные приложения
                            </Text>
                            <Text type='secondary' className="cursor-pointer transition-colors">
                                🎨 UI/UX дизайн
                            </Text>
                            <Text type='secondary' className=" cursor-pointer transition-colors">
                                ☁️ Облачные решения
                            </Text>
                            <Text type='secondary' className="cursor-pointer transition-colors">
                                🔒 Кибербезопасность
                            </Text>
                            <Text type='secondary' className=" cursor-pointer transition-colors">
                                🤖 ИИ и машинное обучение
                            </Text>
                        </Space>
                    </Col>


                    <Col xs={24} sm={12} lg={6}>
                        <Title type='secondary' level={4} >
                            🗺️ Мы на карте
                        </Title>

                        <div className="mt-6">
                            <Map
                                latitude={53.9006}
                                longitude={27.5590}
                                zoom={15}
                                height='20%'
                            />
                        </div>

                    </Col>
                </Row>

                {/* Нижняя часть футера */}
                <div className="border-t border-white/20 mt-12 pt-8">
                    <Row justify="space-between" align="middle" >
                        <Col xs={24} sm={12}>
                            <Text type='secondary'>
                                © 2024 ESDK Group. Все права защищены.
                            </Text>
                        </Col>
                        <Col xs={24} sm={12} className="text-right">
                            <Space size="large">
                                <Text type='secondary' className=" cursor-pointer transition-colors">
                                    Политика конфиденциальности
                                </Text>
                                <Text type='secondary' className=" cursor-pointer transition-colors">
                                    Условия использования
                                </Text>
                            </Space>
                        </Col>
                    </Row>
                </div>

            </div>
        </footer>
    )
}

export default Footer
