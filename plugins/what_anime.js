const _0x4876fb = _0x995b;
(function(_0x90788, _0xf947e7) {
    const _0x46a3b9 = _0x995b,
        _0x35670e = _0x90788();
    while (!![]) {
        try {
            const _0x3f920a = -parseInt(_0x46a3b9(0x17b)) / 0x1 * (-parseInt(_0x46a3b9(0x184)) / 0x2) + parseInt(_0x46a3b9(0x175)) / 0x3 + parseInt(_0x46a3b9(0x194)) / 0x4 + -parseInt(_0x46a3b9(0x188)) / 0x5 + -parseInt(_0x46a3b9(0x172)) / 0x6 + parseInt(_0x46a3b9(0x195)) / 0x7 * (parseInt(_0x46a3b9(0x18a)) / 0x8) + parseInt(_0x46a3b9(0x181)) / 0x9 * (-parseInt(_0x46a3b9(0x193)) / 0xa);
            if (_0x3f920a === _0xf947e7) break;
            else _0x35670e['push'](_0x35670e['shift']());
        } catch (_0x119ce4) {
            _0x35670e['push'](_0x35670e['shift']());
        }
    }
}(_0x579e, 0x98f2f));
const fs = require('fs'),
    {
        UploadFileUgu
    } = require(_0x4876fb(0x177)),
    {
        getBuffer,
        getRandom
    } = require(_0x4876fb(0x171));
let what = async (_0x42d171, _0xc33c98, _0x42de8d, _0x495845, _0x26dc60) => {
    const _0x1d28a4 = _0x4876fb;
    try {
        if (!_0xc33c98) return _0x26dc60[_0x1d28a4(0x18d)]('「\x20❗\x20」please\x20send\x20or\x20reply\x20the\x20img\x20with\x20scene\x20anime\x0a\x20don`t\x20forget\x20to\x20trim\x20the\x20border\x20scene\x20part\x20of\x20the\x20anime');
        _0x26dc60[_0x1d28a4(0x18d)]('process...');
        let _0x5484cc = await _0x42d171['download'](),
            _0x5dc62c = _0x5484cc[_0x1d28a4(0x196)]('base64'),
            _0x3c32c4 = getRandom('.png');
        await fs['writeFileSync'](_0x1d28a4(0x186) + _0x3c32c4, Buffer['from'](_0x5dc62c, _0x1d28a4(0x189)));
        let _0xa1fbb3 = _0x1d28a4(0x186) + _0x3c32c4,
            _0x4ae5f4 = await UploadFileUgu(_0xa1fbb3),
            _0xff93df = await fetch('https://api.trace.moe/search?anilistInfo&url=' + _0x4ae5f4[_0x1d28a4(0x17e)])[_0x1d28a4(0x17c)](_0x558687 => _0x558687[_0x1d28a4(0x18b)]()),
            {
                anilist: _0x1568e2,
                filename: _0x2fe10e,
                episode: _0x2110e8,
                from: _0x4b37e8,
                to: _0x1b1221,
                similarity: _0x4fe569,
                video: _0x382311,
                image: _0x54210b
            } = _0xff93df['result'][0x0];
        var _0x553ce1 = _0x1568e2[_0x1d28a4(0x17f)] ? '「\x20❗\x20」porn\x20detected\x0a\x0a🤚sorry\x20Cannot\x20display\x20results\x20smelling\x20porn!!' : _0x1d28a4(0x192) + (_0x4fe569 < 0.89 ? _0x1d28a4(0x179) : _0x1d28a4(0x18c)) + '\x0a\x0aHentai\x20:\x20' + _0x1568e2[_0x1d28a4(0x17f)] + _0x1d28a4(0x17a) + _0x1568e2['title'][_0x1d28a4(0x174)] + _0x1d28a4(0x187) + _0x1568e2['title'][_0x1d28a4(0x178)] + _0x1d28a4(0x185) + _0x2110e8 + _0x1d28a4(0x180) + _0x382311 + '\x0a',
            _0x1de740 = [{
                'buttonId': _0x1568e2[_0x1d28a4(0x17f)] ? '#' : _0x1d28a4(0x190) + _0x1568e2[_0x1d28a4(0x18f)][_0x1d28a4(0x191)],
                'buttonText': {
                    'displayText': _0x1568e2['isAdult'] ? _0x1d28a4(0x18e) : _0x1d28a4(0x173)
                },
                'type': 0x1
            }];
        _0x42de8d[_0x1d28a4(0x17d)](_0x26dc60['chat'], {
            'caption': _0x553ce1,
            'image': {
                'url': _0x54210b
            },
            'buttons': _0x1de740,
            'footer': _0x1d28a4(0x183)
        }), await fs[_0x1d28a4(0x176)](_0xa1fbb3);
    } catch (_0x524119) {
        console[_0x1d28a4(0x182)](_0x524119), _0x26dc60[_0x1d28a4(0x18d)]('「\x20❗\x20」error\x0a\x0a' + _0x524119);
    }
};

function _0x995b(_0x534cef, _0x43414c) {
    const _0x579ebc = _0x579e();
    return _0x995b = function(_0x995b83, _0x41a03c) {
        _0x995b83 = _0x995b83 - 0x171;
        let _0x1eef37 = _0x579ebc[_0x995b83];
        return _0x1eef37;
    }, _0x995b(_0x534cef, _0x43414c);
}

function _0x579e() {
    const _0x5e02c3 = ['「\x20❗\x20」What\x20Anime\x0a\x0aAkurasi\x20:\x20', '10864290PKrggj', '1100348yfeRMs', '4716691OdQoVP', 'toString', '../lib/myfunc', '2270364CHqjcn', 'Get\x20Info', 'romaji', '1272225TpslnX', 'unlinkSync', '../lib/uploader', 'english', 'not\x20sure?\x0amake\x20sure\x20the\x20anime\x20scene\x20border\x20has\x20been\x20cut', '\x0aTitle\x20romaji\x20:\x20', '7547JicVsl', 'then', 'sendMessage', 'url', 'isAdult', '\x0aScene\x20anime\x20:\x20', '9QlqnqA', 'log', 'Made\x20with\x20api.trace.moe', '212zHkfhs', '\x0aDetail\x20Episode\x20:\x20', './tmp/', '\x0aTitle\x20english\x20:\x20', '408275MMmcHz', 'base64', '8xiOCsp', 'json', 'certain', 'reply', 'No\x20Porn🤚', 'title', '#otakudesu\x20search|', 'romanji'];
    _0x579e = function() {
        return _0x5e02c3;
    };
    return _0x579e();
}
module['exports'] = what;