import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export const NavBar = () => {
    const location = useLocation()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const isActive = (path: string) => {
        return location.pathname === path
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            {/* Десктопная навигация */}
            <nav className="hidden md:block fixed top-0 left-0 right-0 z-60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 lg:h-20">
                        {/* Навигационные ссылки слева */}
                        <div className="flex items-center space-x-6 lg:space-x-8">
                            <Link
                                to="/"
                                onClick={closeMobileMenu}
                                className={`px-4 py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200 ${isActive('/')
                                    ? 'bg-white/20 text-white backdrop-blur-sm'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                Главная
                            </Link>

                            <Link
                                to="/contactus"
                                onClick={closeMobileMenu}
                                className={`px-4 py-2 text-sm lg:text-base font-medium rounded-full transition-all duration-200 ${isActive('/contactus')
                                    ? 'bg-white/20 text-white backdrop-blur-sm'
                                    : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                Связаться с нами
                            </Link>
                        </div>

                        {/* Название компании справа */}
                        <div className="flex-shrink-0">
                            <Link to="/" className="flex items-center">
                                <div className="text-xl lg:text-2xl font-soledago text-white">
                                    ESDK GROUP
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Полупрозрачный фон */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-md -z-10"></div>
            </nav>

            {/* Мобильная навигация */}
            <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
                <div className="px-4 py-3">
                    <div className="flex justify-between items-center">
                        {/* Название компании */}
                        <Link to="/" className="flex items-center">
                            <div className="text-lg font-soledago text-white">
                                ESDK GROUP
                            </div>
                        </Link>

                        {/* Кнопка MENU */}
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white text-sm font-medium px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                        >
                            MENU
                        </button>
                    </div>
                </div>

                {/* Полупрозрачный фон */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-md -z-10"></div>
            </nav>

            {/* Мобильное выезжающее меню */}
            <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out $`}>
                {/* Затемняющий фон */}
                <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                    onClick={closeMobileMenu}
                ></div>

                {/* Меню с анимацией выезжания сверху */}
                <div className={`absolute top-0 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 transition-transform duration-300 ease-out ${isMobileMenuOpen
                    ? 'translate-y-0'
                    : '-translate-y-full'
                    }`}>
                    <div className="px-4 pt-20 pb-6 space-y-4">
                        <Link
                            to="/"
                            onClick={closeMobileMenu}
                            className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive('/')
                                ? 'bg-white/20 text-white'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Главная
                        </Link>

                        <Link
                            to="/contactus"
                            onClick={closeMobileMenu}
                            className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${isActive('/contactus')
                                ? 'bg-white/20 text-white'
                                : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Связаться с нами
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}