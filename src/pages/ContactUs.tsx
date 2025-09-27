import { Card, Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useContactForm } from '../services'

// Коды мобильных операторов Беларуси
const BELARUS_MOBILE_OPERATOR_CODES = [
    '25', // life:)
    '29', // A1 и МТС (зависит от серии номера)
    '33', // МТС
    '44'  // A1
];



/**
 * Проверяет, является ли номер белорусским (соответствует бекенду)
 */
function isBelarusPhoneNumber(phoneNumber: string): boolean {
    // Нормализуем номер (убираем пробелы, дефисы и т.д.)
    const normalizedNumber = phoneNumber.replace(/[\s\-()]/g, '');

    // Проверяем международный формат +375
    const internationalMobileRegex = new RegExp(`^\\+375(${BELARUS_MOBILE_OPERATOR_CODES.join('|')})\\d{7}$`);
    const internationalLandlineRegex = /^\+375(17\d{7}|(162|212|232|152|222)\d{6})$/;

    // Проверяем внутренний формат 80 (8-0XX-XXX-XXXX)
    const internalMobileRegex = new RegExp(`^8(0${BELARUS_MOBILE_OPERATOR_CODES.join('|0')})\\d{7}$`);
    const internalLandlineRegex = /^8(017\d{7}|0(162|212|232|152|222)\d{6})$/;

    return internationalMobileRegex.test(normalizedNumber) ||
        internationalLandlineRegex.test(normalizedNumber) ||
        internalMobileRegex.test(normalizedNumber) ||
        internalLandlineRegex.test(normalizedNumber);
}

// Схема валидации с Yup (соответствует бекенду)
const schema = yup.object({
    phone: yup
        .string()
        .required('Номер телефона обязателен')
        .test('belarus-phone', 'Номер телефона должен быть белорусским. Мобильные: +375(25|29|33|44)XXXXXXX, Стационарные: +375(17|162|212|232|152|222)XXXXXXX', function (value) {
            if (!value) return false;
            return isBelarusPhoneNumber(value);
        }),
    message: yup
        .string()
        .required('Сообщение обязательно')
        .min(3, 'Сообщение должно содержать минимум 3 символа')
})

interface FormData {
    phone: string;
    message: string;
}

const ContactUs = () => {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
            message: ''
        }
    })

    const { submitForm, isLoading, error, success, resetForm } = useContactForm()

    const onSubmit = async (data: FormData) => {
        const result = await submitForm(data)

        if (result.success) {
            // Показываем собственный попап
            const popup = document.createElement('div')
            popup.innerHTML = `✅ ${result.message || 'Сообщение успешно отправлено!'}`
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(82, 196, 26, 0.5);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                z-index: 99999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                animation: fadeIn 0.3s ease;
            `
            document.body.appendChild(popup)

            setTimeout(() => {
                popup.remove()
            }, 1500)

            reset()
            resetForm()
        } else {
            // Показываем ошибку
            const popup = document.createElement('div')
            popup.innerHTML = `❌ ${result.error || 'Ошибка отправки формы'}`
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(255, 77, 79, 0.5);
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                z-index: 99999;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                animation: fadeIn 0.3s ease;
            `
            document.body.appendChild(popup)

            setTimeout(() => {
                popup.remove()
            }, 4000)
        }
    }

    const handleClearForm = () => {
        reset()
        resetForm()
    }


    return (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center gap-4">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-soledago text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-4 sm:mb-6">
                        Форма обратной связи
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                        Заполните форму ниже, чтобы связаться с нами.
                    </p>
                </div>

                <Card className="shadow-lg mb-8 w-full ">
                    <Form onFinish={handleSubmit(onSubmit)} layout="vertical" className=" flex flex-col items-center justify-center">
                        <Form.Item
                            label="📱 Номер телефона (Беларусь)"
                            validateStatus={errors.phone ? 'error' : ''}
                            help={errors.phone?.message}
                            className="w-[80%]"
                        >
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="tel"
                                        placeholder="+375291234567"
                                        size="large"
                                        className="text-lg w-full"
                                        style={{ width: '100%' }}
                                        onChange={(e) => {
                                            // Разрешаем только цифры, +, -, (, ), пробелы
                                            const value = e.target.value.replace(/[^0-9+\-()\s]/g, '');
                                            field.onChange(value);
                                        }}
                                    />
                                )}
                            />
                            <div className="text-sm text-gray-500 mt-1 text-start">
                                Поддерживаемые форматы:<br />
                                • Международный: +375(25|29|33|44)XXXXXXX (мобильные)<br />
                                • Международный: +375(17|162|212|232|152|222)XXXXXXX (стационарные)<br />
                                • Внутренний: 8(025|029|033|044)XXXXXXX (мобильные)<br />
                                • Внутренний: 8(017|0162|0212|0232|0152|0222)XXXXXXX (стационарные)
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="💬 Сообщение"
                            validateStatus={errors.message ? 'error' : ''}
                            help={errors.message?.message}
                            className="w-[80%]"
                        >
                            <Controller
                                name="message"
                                control={control}
                                render={({ field }) => (
                                    <Input.TextArea
                                        {...field}
                                        placeholder="Введите ваше сообщение (минимум 3 символа)"
                                        rows={4}
                                        size="large"
                                        className="text-lg w-full"
                                        style={{ width: '100%' }}
                                    />
                                )}
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Минимум 3 символа
                            </div>
                        </Form.Item>

                        {error && (
                            <Form.Item className="text-center">
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                    ❌ {error}
                                </div>
                            </Form.Item>
                        )}

                        {success && (
                            <Form.Item className="text-center">
                                <div className="text-green-500 text-sm bg-green-50 p-3 rounded-lg border border-green-200">
                                    ✅ Сообщение успешно отправлено!
                                </div>
                            </Form.Item>
                        )}

                        <Form.Item className="text-center">
                            <Button
                                size="large"
                                className="custom-button"
                                htmlType="submit"
                                loading={isLoading}
                                disabled={isLoading}
                                style={{
                                    backgroundColor: isLoading ? '#f0f0f0' : 'transparent',
                                    color: isLoading ? '#999' : 'purple',
                                    height: '50px',
                                    fontSize: 'clamp(12px, 2.5vw, 20px)',
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    border: isLoading ? '1px solid #ccc' : '1px solid purple',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    opacity: isLoading ? 0.6 : 1,
                                }}
                            >
                                {isLoading ? '⏳ Отправка...' : '📤 Отправить сообщение'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {/* Информация о валидации */}
                <Card title="🔍 Информация о валидации" className="shadow-lg w-full mb-6 sm:mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">📱 Номер телефона</h3>
                            <ul className="text-blue-600 space-y-1">
                                <li>• Только белорусские номера</li>
                                <li>• Мобильные: +375(25|29|33|44)XXXXXXX</li>
                                <li>• Стационарные: +375(17|162|212|232|152|222)XXXXXXX</li>
                                <li>• Обязательное поле</li>
                            </ul>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-2">💬 Сообщение</h3>
                            <ul className="text-green-600 space-y-1">
                                <li>• Минимум 3 символа</li>
                                <li>• Обязательное поле</li>
                                <li>• Многострочный ввод</li>
                                <li>• Валидация в реальном времени</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Технологии */}
                <Card title="🛠️ Используемые технологии" className="shadow-lg w-full mb-6 sm:mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center p-4 bg-blue-100 rounded-lg">
                            <div className="text-2xl mb-2">⚛️</div>
                            <div className="font-semibold">React Hook Form</div>
                        </div>
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                            <div className="text-2xl mb-2">✅</div>
                            <div className="font-semibold">Yup Validation</div>
                        </div>
                        <div className="text-center p-4 bg-purple-100 rounded-lg">
                            <div className="text-2xl mb-2">🎨</div>
                            <div className="font-semibold">Ant Design</div>
                        </div>
                        <div className="text-center p-4 bg-orange-100 rounded-lg">
                            <div className="text-2xl mb-2">🎯</div>
                            <div className="font-semibold">TypeScript</div>
                        </div>
                    </div>
                </Card>

                {/* Навигация */}
                <div className="text-center">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/">

                            <Button
                                size="large"
                                className="custom-button"
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'purple',
                                    width: '100%',
                                    height: '50px',
                                    fontSize: 'clamp(12px, 2.5vw, 20px)',
                                    fontWeight: 'bold',
                                    borderRadius: '10px',
                                    border: '1px solid purple',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                ← Назад на главную
                            </Button>


                        </Link>
                        <Button
                            size="large"
                            className="custom-button z-50 relative"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'purple',
                                width: '100%',
                                height: '50px',
                                fontSize: 'clamp(12px, 2.5vw, 20px)',
                                fontWeight: 'bold',
                                borderRadius: '10px',
                                border: '1px solid purple',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onClick={handleClearForm}
                        >
                            🗑️ Очистить форму
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs
