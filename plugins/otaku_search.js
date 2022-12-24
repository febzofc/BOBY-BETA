var _0x20843e = _0x48b4;

function _0x48b4(_0x5305b9, _0x371e62) {
    var _0x4eaea2 = _0x4eae();
    return _0x48b4 = function(_0x48b4b6, _0x553a86) {
        _0x48b4b6 = _0x48b4b6 - 0x82;
        var _0x48c3ba = _0x4eaea2[_0x48b4b6];
        return _0x48c3ba;
    }, _0x48b4(_0x5305b9, _0x371e62);
}

function _0x4eae() {
    var _0x165d3e = ['Download\x20&&\x20Batch', '「\x20❗\x20」sorry\x20anime\x20not\x20found!!', '380QYrQme', 'status', 'log', '8iOXsos', '../lib/myfunc', 'status:\x20', 'reply', '11411820moVaZL', 'otakudesu\x20get|', '2BBFIPv', '260Twgywl', '3704217skHrSr', '../lib/otakudesu', '1018530UeEcMq', 'exports', 'title', '1020283tfWFrN', '584841FsHjrM', '26375xUuPbv', '294861ZMHKBN', '「\x20❗\x20」\x20_Masukan\x20parameter\x20query_', 'Anime\x20ditemukan!\x20silahkan\x20klik\x20dan\x20pilih\x20salah\x20satu\x20list\x20anime'];
    _0x4eae = function() {
        return _0x165d3e;
    };
    return _0x4eae();
}(function(_0x30db7b, _0x4ce519) {
    var _0x540e56 = _0x48b4,
        _0x158efd = _0x30db7b();
    while (!![]) {
        try {
            var _0x4aadcb = -parseInt(_0x540e56(0x93)) / 0x1 + parseInt(_0x540e56(0x8b)) / 0x2 * (-parseInt(_0x540e56(0x8d)) / 0x3) + -parseInt(_0x540e56(0x8c)) / 0x4 * (-parseInt(_0x540e56(0x94)) / 0x5) + -parseInt(_0x540e56(0x8f)) / 0x6 + -parseInt(_0x540e56(0x95)) / 0x7 * (-parseInt(_0x540e56(0x85)) / 0x8) + -parseInt(_0x540e56(0x89)) / 0x9 + -parseInt(_0x540e56(0x82)) / 0xa * (-parseInt(_0x540e56(0x92)) / 0xb);
            if (_0x4aadcb === _0x4ce519) break;
            else _0x158efd['push'](_0x158efd['shift']());
        } catch (_0x1d1e0b) {
            _0x158efd['push'](_0x158efd['shift']());
        }
    }
}(_0x4eae, 0x9f409));
let {
    fetchJson,
    getBuffer
} = require(_0x20843e(0x86)), {
    search
} = require(_0x20843e(0x8e)), otaku_search = async (_0x391bd4, _0x1c0b6b, _0x32bea3, _0x4e21d1, _0x4b35aa, _0x49929b, _0x3942a3) => {
    var _0x250e85 = _0x20843e;
    try {
        if (!_0x1c0b6b) return _0x391bd4[_0x250e85(0x88)](_0x250e85(0x96));
        var _0x394f2b = await search(_0x1c0b6b),
            _0x49114d = _0x250e85(0x97),
            _0x2cb260 = [],
            _0x15e49e = 'silahkan\x20memilih!';
        for (let _0x550555 of _0x394f2b) {
            _0x2cb260['push']({
                'title': _0x550555[_0x250e85(0x91)],
                'rowId': _0x32bea3 + _0x250e85(0x8a) + _0x550555['id'],
                'description': _0x250e85(0x87) + _0x550555[_0x250e85(0x83)] + '\x20rating:\x20' + _0x550555['rating']
            });
        }
        var _0x75f04b = [{
            'title': _0x250e85(0x98),
            'rows': _0x2cb260
        }];
        const _0x31157f = {
            'text': _0x49114d,
            'footer': 'scraper\x20made\x20by\x20restu',
            'buttonText': 'Click\x20Here',
            'sections': _0x75f04b
        };
        _0x3942a3['sendMessage'](_0x391bd4['chat'], _0x31157f, {
            'quoted': _0x4b35aa
        });
    } catch (_0x463833) {
        _0x391bd4['reply'](_0x250e85(0x99)), console[_0x250e85(0x84)](_0x463833);
    }
};
module[_0x20843e(0x90)] = otaku_search;