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
import YandexMap from './YandexMap'

const { Title, Text, Paragraph } = Typography

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-gray-700 to-purple-900 text-white rounded-t-3xl relative z-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Row gutter={[32, 32]} className="space-y-8 md:space-y-0">
                    {/* Информация о компании */}
                    <Col xs={24} md={12} lg={6}>
                        <div className="mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🚀</span>
                                </div>
                                <Title type='secondary' level={3} className=" mb-0 ">
                                    ESKD Group
                                </Title>
                            </div>
                            <Paragraph type='secondary' className="text-gray-300 mb-4">
                                Мы работаем в сфере вентиляционного оборудования и строительно-монтажных работ уже более 10 лет, поэтому с уверенностью можем сказать, что FERCSTROY - это Ваш надёжный партнёр в сфере строительства.
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
                    <Col xs={24} md={12} lg={6}>
                        <Title type='secondary' level={4} className="mb-6">
                            📞 Контакты
                        </Title>
                        <Space direction="vertical" size="large" className="w-full">
                            <div className="flex items-start space-x-3">
                                <EnvironmentOutlined className="text-telegram-blue text-xl mt-1" />
                                <div>
                                    <Text type='secondary' className=" block">Адрес:</Text>
                                    <Text type='secondary' className="">220033, г. Минск, Партизанский пр-т, д.8/11, пом. 9</Text>
                                    <Text type='secondary' className=" block">Минск, Беларусь 220005</Text>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <PhoneOutlined className="text-telegram-blue text-xl" />
                                <div>
                                    <Text type='secondary' className=" block">Телефон:</Text>
                                    <Text type='secondary' className="">+375 17 336 24 13</Text>
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
                    <Col xs={24} md={12} lg={6}>
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


                    <Col xs={24} md={12} lg={6}>
                        <Title type='secondary' level={4} >
                            🗺️ Мы на карте
                        </Title>

                        <div className="mt-6">
                            <YandexMap
                                latitude={53.875676}
                                longitude={27.668762}
                                zoom={15}
                                height='300px'
                            />
                        </div>

                    </Col>
                </Row>

                {/* чисто для иллюстрации ant design, так конечно можно все писать на tailwind и не дурить голову */}
                <div className="border-t border-white/20 mt-12 pt-8">
                    <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <Text type='secondary'>
                                © 2024 ESKD Group. <span className="hidden sm:block">Все права защищены.</span>
                            </Text>
                        </div>
                        <div className="text-start  md:text-right">
                            <Space size="large" direction="vertical" className="md:!flex md:!flex-row">
                                <Text type='secondary' className="cursor-pointer transition-colors">
                                    Политика конфиденциальности
                                </Text>
                                <Text type='secondary' className="cursor-pointer transition-colors">
                                    Условия использования
                                </Text>
                            </Space>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
