import { Button } from 'antd'
import { Card } from 'antd'
import { useNavigate } from 'react-router-dom';



const Home = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/contactus', { replace: true });
    }

    return (
        <div className="  min-h-screen pb-15 min-w-screen bg-gradient-to-b from-blue-50 to-purple-200 relative">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
                <h1 className="w-full text-3xl sm:text-4xl md:text-5xl font-soledago text-center text-purple-200 text-shadow-lg/20 text-shadow-gray-600 cursor-default relative overflow-hidden">
                    <span className="inline-block animate-fade-in-up animate-glow hover:animate-float transition-all duration-500 hover:scale-105 hover:text-purple-300">
                        NIHAO ESDK GROUP
                    </span>
                </h1>

                <div className="text-center mb-8 sm:mb-12">


                </div>
                <div className="text-center mb-8 sm:mb-12 w-full">
                    <div className="inline-block p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
                        <img
                            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY25mNWwyd25qcTEybzJ1MXEyYWhmcTZldGtueHowNHB5cmh4ZTlxeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6w4QMdUSaiQqGQRQGJ/giphy.gif"
                            alt="Funny dancing cat"
                            className="w-fullobject-cover rounded-xl"
                        />
                        <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-700">
                            Вечер в хату! Красивые
                        </p>
                    </div>
                </div>

                {/* Информационные карточки */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 mx-2 sm:mb-12">
                    <Card className="shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 ">
                        <div className="text-center p-4">
                            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💻</div>
                            <h3 className="text-lg sm:text-xl font-travels-semibold mb-2 sm:mb-3">Современные технологии</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                React, TypeScript, Tailwind CSS, Ant Design - все самое лучшее для разработки!
                            </p>
                        </div>
                    </Card>

                    <Card className="shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 ">
                        <div className="text-center p-4">
                            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎨</div>
                            <h3 className="text-lg sm:text-xl font-travels-semibold mb-2 sm:mb-3">Красивый дизайн</h3>
                            <p className="text-sm sm:text-base text-gray-600">
                                Создаем интерфейсы, которые радуют глаз и удобны в использовании!
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Кнопка перехода на вторую страницу */}
                <div onClick={handleNavigate} className="text-center">

                    <Button
                        size="large"
                        className="custom-button"

                        style={{
                            backgroundColor: 'transparent',
                            color: 'purple',
                            width: '30%',
                            height: '50px',
                            fontSize: 'clamp(12px, 2.5vw, 20px)',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            border: '1px solid purple',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Написать нам
                    </Button>

                </div>
            </div>
            <div className="w-full absolute -bottom-5 pb-10 overflow-hidden bg-black/20 backdrop-blur-sm py-4 z-10">
                <div className="marquee-container">
                    <div className="marquee-text">
                        <span className="text-purple-800 font-bold text-lg sm:text-xl">
                            🚀 Здесь могла бы быть ваша реклама 🚀 • Разместите свой баннер • Привлеките новых клиентов • Увеличьте продажи • Свяжитесь с нами для размещения рекламы •
                        </span>
                        <span className="text-purple-800 font-bold text-lg sm:text-xl">
                            🚀 Здесь могла бы быть ваша реклама 🚀 • Разместите свой баннер • Привлеките новых клиентов • Увеличьте продажи • Свяжитесь с нами для размещения рекламы •
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home
