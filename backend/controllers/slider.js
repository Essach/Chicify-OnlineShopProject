const sliderTitles = [
    'placeholder',
    'placeholder',
    'placeholder',
    'placeholder'
];

exports.getSliderTitles = (request, responsem, next) => {
    try {
        response.status(200).json({
            sliderTitles: sliderTitles
        })
    } catch (error) {
        response.status(500).json({
            error,
            message: 'internal server error'
        })
    }
}