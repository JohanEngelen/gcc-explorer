// Copyright (c) 2012-2016, Matt Godbolt
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

define(function (require) {
    "use strict";
    var _ = require('underscore');
    var EventEmitter = require('events');

    function FontScale(domRoot, state) {
        EventEmitter.call(this);
        this.domRoot = domRoot;
        this.scale = state.fontScale || 1.0;
        this.apply();

        this.domRoot.find('.increase-font-size').click(_.bind(function () {
            this.scale += 0.1;
            this.apply();
            this.emit('change');
        }, this));
        this.domRoot.find('.decrease-font-size').click(_.bind(function () {
            if (this.scale <= 0.3) return;
            this.scale -= 0.1;
            this.apply();
            this.emit('change');
        }, this));
        this.domRoot.find('.reset-font-size').click(_.bind(function () {
            this.scale = 1.0;
            this.apply();
            this.emit('change');
        }, this));
    }

    _.extend(FontScale.prototype, EventEmitter.prototype);

    FontScale.prototype.apply = function () {
        this.domRoot.find('.CodeMirror').css('font-size', (10 * this.scale) + "pt");
    };

    FontScale.prototype.addState = function (state) {
        if (this.scale != 1.0)
            state.fontScale = this.scale;
    };

    return FontScale;
});