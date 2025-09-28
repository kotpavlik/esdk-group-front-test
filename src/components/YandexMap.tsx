import React, { useEffect, useRef } from 'react'

interface YandexMapProps {
    latitude: number
    longitude: number
    zoom?: number
    height?: string
}

const YandexMap: React.FC<YandexMapProps> = ({
    latitude,
    longitude,
    zoom = 15,
    height = '300px'
}) => {
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!mapRef.current) return

        // Загружаем Яндекс карты
        const script = document.createElement('script')
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${import.meta.env.VITE_YANDEX_MAPS_API_KEY || 'demo'}&lang=ru_RU`
        script.async = true

        script.onload = () => {
            // @ts-expect-error - Яндекс карты загружаются динамически
            if (window.ymaps) {
                // @ts-expect-error - Яндекс карты загружаются динамически
                window.ymaps.ready(() => {
                    if (mapRef.current) {
                        // @ts-expect-error - Яндекс карты загружаются динамически
                        const map = new window.ymaps.Map(mapRef.current, {
                            center: [latitude, longitude],
                            zoom: zoom,
                            controls: ['zoomControl', 'fullscreenControl']
                        })

                        // Добавляем маркер
                        // @ts-expect-error - Яндекс карты загружаются динамически
                        const placemark = new window.ymaps.Placemark([latitude, longitude], {
                            balloonContent: 'ESKD GROUP - Мы здесь!<br/>220033, г. Минск, Партизанский пр-т, д.8/11, пом. 9'
                        }, {
                            preset: 'islands#redDotIcon'
                        })

                        map.geoObjects.add(placemark)
                    }
                })
            }
        }

        document.head.appendChild(script)

        return () => {
            // Очистка при размонтировании
            if (document.head.contains(script)) {
                document.head.removeChild(script)
            }
        }
    }, [latitude, longitude, zoom])

    return (
        <div
            ref={mapRef}
            style={{
                height: height,
                width: '100%',
                borderRadius: '12px',
                overflow: 'hidden'
            }}
            className="w-full rounded-xl"
        />
    )
}

export default YandexMap
