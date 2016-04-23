    var defaults = {
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
        firstDay: 1, // First day of the week, Monday
        weekendDays: [0, 6], // Sunday and Saturday
        multiple: false,
        dateFormat: 'yyyy-mm-dd',
        direction: 'horizontal', // or 'vertical'
        disabledDates: [],//需要被禁止的日期
        minDate: null,
        maxDate: null,
        touchMove: true,
        animate: true,
        closeOnSelect: true,
        monthPicker: true,
        monthPickerTemplate: '<div class="picker-calendar-month-picker">' +
        '<a href="javascript:void(0);" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
        '<span class="current-month-value"></span>' +
        '<a href="javascript:void(0);" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
        '</div>',
        yearPicker: true,
        yearPickerTemplate: '<div class="picker-calendar-year-picker">' +
        '<a href="javascript:void(0);" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
        '<span class="current-year-value"></span>' +
        '<a href="javascript:void(0);" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
        '</div>',
        weekHeader: true,
        // Common settings
        scrollToInput: true,
        inputReadOnly: true,
        convertToPopover: true,
        onlyInPopover: false,
        toolbar: true,
        toolbarCloseText: '完成',
        headerPlaceholder: '选择日期',
        toolbarTemplate: '<div class="toolbar">' +
        '<div class="toolbar-inner">' +
        '{{monthPicker}}' +
        '{{yearPicker}}' +
        '</div>' +
        '</div>',
        headerTemplate: '<div class="picker-header">' +
        '<div class="picker-calendar-selected-date">{{placeholder}}</div>' +
        '</div>',
        footerTemplate: '<div class="picker-footer">' +
        '<a href="javascript:void(0);" class="button close-picker">{{closeText}}</a>' +
        '</div>',

        /* Callbacks
         onMonthAdd
         onChange:(values)
         onOpen
         onClose
         onFinish
         onDayClick
         onMonthYearChangeStart:(currentYear, currentMonth)
         onMonthYearChangeEnd:(currentYear, currentMonth)
         */
    };

    var support = (function() {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        };
        // Export object
        return support;
    })();

    // Touch events
    var touchEvents = {
        start: support.touch ? 'touchstart' : 'mousedown',
        move: support.touch ? 'touchmove' : 'mousemove',
        end: support.touch ? 'touchend' : 'mouseup'
    };

    // Format date
    var formatDate = function(date, params) {
        var self = this;
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth();
        var month1 = month + 1;
        var day = date.getDate();
        var weekDay = date.getDay();

        return params.dateFormat
            .replace(/yyyy/g, year)
            .replace(/yy/g, (year + '').substring(2))
            .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
            .replace(/m(\W+)/g, month1 + '$1')
            .replace(/MM/g, params.monthNames[month])
            .replace(/M(\W+)/g, params.monthNamesShort[month] + '$1')
            .replace(/dd/g, day < 10 ? '0' + day : day)
            .replace(/d(\W+)/g, day + '$1')
            .replace(/DD/g, params.dayNames[weekDay])
            .replace(/D(\W+)/g, params.dayNamesShort[weekDay] + '$1');
    };

    var calendar = function(params) {

        var self = this;

        params = params || {};

        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
        }



        self.params = params;

        self.opened = false;
        self.initialized = false;

        self.inline = self.params.container ? true : false;

        // Is horizontal
        self.isH = self.params.direction === 'horizontal';

        // Animating flag
        self.animating = false;

        if (self.inline) {
            self.open();
        }

        if (self.params.input) {
            self.input = $(self.params.input);
            if (self.input.length > 0) {
                if (self.params.inputReadOnly) self.input.prop('readOnly', true);
                if (!self.inline) {
                    self.input.on('click', function(e) {
                        self.openOnInput(e, self);
                    });
                }
                if (self.params.inputReadOnly) {
                    self.input.on('focus mousedown', function(e) {
                        e.preventDefault();
                    });
                }
            }

        }

        if (!self.inline) $('html').on('tap', function(e) {
            self.closeOnHTMLClick(e, self);
        });
    };

    // Should be converted to popover
    calendar.prototype.isPopover = function() {
        var self = this;
        var toPopover = false;
        if (!self.params.convertToPopover && !self.params.onlyInPopover) return toPopover;
        if (!self.inline && self.params.input) {
            if (self.params.onlyInPopover) {
                toPopover = true;
            } else {
                toPopover = false;
            }
        }
        return toPopover;
    };

    calendar.prototype.inPopover = function() {
        var self = this;
        if (self.opened && self.container && self.container.length > 0 && self.container.parents('.popover').length > 0) return true;
        else return false;
    };

    // Value
    calendar.prototype.addValue = function(value) {

        var self = this;

        if (self.params.multiple) {
            if (!self.value) self.value = [];
            var inValuesIndex;
            for (var i = 0; i < self.value.length; i++) {
                if (new Date(value).getTime() === new Date(self.value[i]).getTime()) {
                    inValuesIndex = i;
                }
            }
            if (typeof inValuesIndex === 'undefined') {
                self.value.push(value);
            } else {
                self.value.splice(inValuesIndex, 1);
            }
            self.updateValue();
        } else {
            self.value = [value];
            self.updateValue();
        }
    };

    calendar.prototype.setValue = function(arrValues) {
        var self = this;
        self.value = arrValues;
        self.updateValue();
    };

    calendar.prototype.updateValue = function(onlyHeader) {
        var self = this;
        self.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
        var i, inputValue;
        for (i = 0; i < self.value.length; i++) {
            var valueDate = new Date(self.value[i]);
            self.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
        }
        if (self.params.onChange) {
            self.params.onChange(self, self.value);
        }
        if ((self.input && self.input.length > 0)) {
            if (self.params.formatValue) inputValue = self.params.formatValue(self, self.value);
            else {
                inputValue = [];
                for (i = 0; i < self.value.length; i++) {
                    inputValue.push(formatDate(self.value[i], self.params));
                }
                inputValue = inputValue.join(', ');
            }
            if (self.input && self.input.length > 0 && !onlyHeader) {
                $(self.input).val(inputValue);
                $(self.input).trigger('change');
            }

        }
    };

    // Columns Handlers
    calendar.prototype.initCalendarEvents = function() {
        var self = this;
        var col;
        var allowItemClick = true;
        var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;

        function handleTouchStart(e) {
            if (isMoved || isTouched) return;
            // e.preventDefault();
            isTouched = true;
            touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            percentage = 0;
            allowItemClick = true;
            isScrolling = undefined;
            startTranslate = currentTranslate = self.monthsTranslate;
        };

        function handleTouchMove(e) {
            if (!isTouched) return;

            touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
            }
            if (self.isH && isScrolling) {
                isTouched = false;
                return;
            }
            e.preventDefault();
            if (self.animating) {
                isTouched = false;
                return;
            }
            allowItemClick = false;
            if (!isMoved) {
                // First move
                isMoved = true;
                wrapperWidth = self.wrapper[0].offsetWidth;
                wrapperHeight = self.wrapper[0].offsetHeight;
                self.wrapper.css({
                    'transition': 0
                });
            }
            e.preventDefault();

            touchesDiff = self.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
            percentage = touchesDiff / (self.isH ? wrapperWidth : wrapperHeight);
            currentTranslate = (self.monthsTranslate + percentage) * 100;

            // Transform wrapper
            self.wrapper.css({
                '-webkit-transform': 'translate3d('+(self.isH ? currentTranslate : 0) + '%, ' + (self.isH ? 0 : currentTranslate) + '%, 0)',
                'transform': 'translate3d('+(self.isH ? currentTranslate : 0) + '%, ' + (self.isH ? 0 : currentTranslate) + '%, 0)'
                // 'translate3d': (self.isH ? currentTranslate : 0) + '%, ' + (self.isH ? 0 : currentTranslate) + '%, 0'
            });
        };

        function handleTouchEnd(e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            touchEndTime = new Date().getTime();
            if (touchEndTime - touchStartTime < 300) {
                if (Math.abs(touchesDiff) < 10) {
                    self.resetMonth();
                } else if (touchesDiff >= 10) {
                    self.prevMonth();
                } else {
                    self.nextMonth();
                }
            } else {
                if (percentage <= -0.5) {
                    self.nextMonth();
                } else if (percentage >= 0.5) {
                    self.prevMonth();
                } else {
                    self.resetMonth();
                }
            }

            // Allow click
            setTimeout(function() {
                allowItemClick = true;
            }, 100);
        };

        function handleDayClick(e) {
            if (!allowItemClick) return;
            var day = $(e.target).parents('.picker-calendar-day');
            if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                day = $(e.target);
            }
            if (day.length === 0) return;
            if (day.hasClass('picker-calendar-day-selected') && !self.params.multiple) return;
            if (day.hasClass('picker-calendar-day-disabled')) return;
            if (day.hasClass('picker-calendar-day-next')) self.nextMonth();
            if (day.hasClass('picker-calendar-day-prev')) self.prevMonth();
            var dateYear = day.attr('data-year');
            var dateMonth = day.attr('data-month');
            var dateDay = day.attr('data-day');
            if (self.params.onDayClick) {
                self.params.onDayClick(self, day[0], dateYear, dateMonth, dateDay);
            }
            self.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
            if (self.params.closeOnSelect) self.close();
        };

        self.container.find('.picker-calendar-prev-month').on('tap', function() {
            self.prevMonth();
        });
        self.container.find('.picker-calendar-next-month').on('tap', function() {
            self.nextMonth();
        });
        self.container.find('.picker-calendar-prev-year').on('tap', function() {
            self.prevYear();
        });
        self.container.find('.picker-calendar-next-year').on('tap', function() {
            self.nextYear();
        });
        self.wrapper.on('tap', handleDayClick);

        if (self.params.touchMove) {
            self.wrapper.on(touchEvents.start, handleTouchStart);
            self.wrapper.on(touchEvents.move, handleTouchMove);
            self.wrapper.on(touchEvents.end, handleTouchEnd);
        }

        self.container[0].f7DestroyCalendarEvents = function() {
            self.container.find('.picker-calendar-prev-month').off('tap', function() {
                self.prevMonth();
            });
            self.container.find('.picker-calendar-next-month').off('tap', function() {
                self.nextMonth();
            });
            self.container.find('.picker-calendar-prev-year').off('tap', function() {
                self.prevYear();
            });
            self.container.find('.picker-calendar-next-year').off('tap', function() {
                self.nextYear();
            });
            self.wrapper.off('tap', handleDayClick);
            if (self.params.touchMove) {
                self.wrapper.off(touchEvents.start, handleTouchStart);
                self.wrapper.off(touchEvents.move, handleTouchMove);
                self.wrapper.off(touchEvents.end, handleTouchEnd);
            }
        };

    };
    calendar.prototype.destroyCalendarEvents = function(colContainer) {
        var self = this;
        if ('f7DestroyCalendarEvents' in self.container[0]) self.container[0].f7DestroyCalendarEvents();
    };

    // Calendar Methods
    calendar.prototype.daysInMonth = function(date) {
        var self = this;
        var d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    };
    calendar.prototype.monthHTML = function(date, offset) {
        var self = this;
        date = new Date(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate();
        if (offset === 'next') {
            if (month === 11) date = new Date(year + 1, 0);
            else date = new Date(year, month + 1, 1);
        }
        if (offset === 'prev') {
            if (month === 0) date = new Date(year - 1, 11);
            else date = new Date(year, month - 1, 1);
        }
        if (offset === 'next' || offset === 'prev') {
            month = date.getMonth();
            year = date.getFullYear();
        }
        var daysInPrevMonth = self.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
            daysInMonth = self.daysInMonth(date),
            firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
        if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

        var dayDate, currentValues = [],
            i, j,
            rows = 6,
            cols = 7,
            monthHTML = '',
            dayIndex = 0 + (self.params.firstDay - 1),
            today = new Date().setHours(0, 0, 0, 0),
            disabledDates = self.params.disabledDates ? self.params.disabledDates : [],
            minDate = self.params.minDate ? new Date(self.params.minDate).getTime() : null,
            maxDate = self.params.maxDate ? new Date(self.params.maxDate).getTime() : null;

        if (self.value && self.value.length) {
            for (i = 0; i < self.value.length; i++) {
                currentValues.push(new Date(self.value[i]).setHours(0, 0, 0, 0));
            }
        }

        for (i = 1; i <= rows; i++) {
            var rowHTML = '';
            var row = i;
            for (j = 1; j <= cols; j++) {
                var col = j;
                dayIndex++;
                var dayNumber = dayIndex - firstDayOfMonthIndex;
                var addClass = '';
                if (dayNumber < 0) {
                    dayNumber = daysInPrevMonth + dayNumber + 1;
                    addClass += ' picker-calendar-day-prev';
                    dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                } else {
                    dayNumber = dayNumber + 1;
                    if (dayNumber > daysInMonth) {
                        dayNumber = dayNumber - daysInMonth;
                        addClass += ' picker-calendar-day-next';
                        dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                    } else {
                        dayDate = new Date(year, month, dayNumber).getTime();
                    }
                }

                //console.log('dayDate',dayDate);
                // Today
                if (dayDate === today) addClass += ' picker-calendar-day-today';
                // Selected
                if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                // Weekend
                if (self.params.weekendDays.indexOf(col - 1) >= 0) {
                    addClass += ' picker-calendar-day-weekend';
                }
                // Disabled
                if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                    addClass += ' picker-calendar-day-disabled';
                }
                //参数中就需要被禁用
                if(disabledDates.indexOf(dayDate) > -1){
                    addClass += ' picker-calendar-day-disabled';
                }


                dayDate = new Date(dayDate);
                var dayYear = dayDate.getFullYear();
                var dayMonth = dayDate.getMonth();
                rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>' + dayNumber + '</span></div>';
            }
            monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
        }
        monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
        return monthHTML;
    };

    calendar.prototype.updateCurrentMonthYear = function(dir) {
        var self = this;
        if (typeof dir === 'undefined') {
            self.currentMonth = parseInt(self.months.eq(1).attr('data-month'), 10);
            self.currentYear = parseInt(self.months.eq(1).attr('data-year'), 10);
        } else {
            self.currentMonth = parseInt(self.months.eq(dir === 'next' ? (self.months.length - 1) : 0).attr('data-month'), 10);
            self.currentYear = parseInt(self.months.eq(dir === 'next' ? (self.months.length - 1) : 0).attr('data-year'), 10);
        }
        self.container.find('.current-month-value').text(self.params.monthNames[self.currentMonth]);
        self.container.find('.current-year-value').text(self.currentYear);

    };
    calendar.prototype.onMonthChangeStart = function(dir) {
        var self = this;
        self.updateCurrentMonthYear(dir);
        self.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
        var currentIndex = dir === 'next' ? self.months.length - 1 : 0;

        self.months.eq(currentIndex).addClass('picker-calendar-month-current');
        self.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');

        if (self.params.onMonthYearChangeStart) {
            self.params.onMonthYearChangeStart(self, self.currentYear, self.currentMonth);
        }
    };
    calendar.prototype.onMonthChangeEnd = function(dir, rebuildBoth) {
        var self = this;
        self.animating = false;
        var nextMonthHTML, prevMonthHTML, newMonthHTML;
        self.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();

        if (typeof dir === 'undefined') {
            dir = 'next';
            rebuildBoth = true;
        }
        if (!rebuildBoth) {
            newMonthHTML = self.monthHTML(new Date(self.currentYear, self.currentMonth), dir);
        } else {
            self.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
            prevMonthHTML = self.monthHTML(new Date(self.currentYear, self.currentMonth), 'prev');
            nextMonthHTML = self.monthHTML(new Date(self.currentYear, self.currentMonth), 'next');
        }
        if (dir === 'next' || rebuildBoth) {
            self.wrapper.append(newMonthHTML || nextMonthHTML);
        }
        if (dir === 'prev' || rebuildBoth) {
            self.wrapper.prepend(newMonthHTML || prevMonthHTML);
        }
        self.months = self.wrapper.find('.picker-calendar-month');
        self.setMonthsTranslate(self.monthsTranslate);
        if (self.params.onMonthAdd) {
            self.params.onMonthAdd(self, dir === 'next' ? self.months.eq(self.months.length - 1)[0] : self.months.eq(0)[0]);
        }
        if (self.params.onMonthYearChangeEnd) {
            self.params.onMonthYearChangeEnd(self, self.currentYear, self.currentMonth);
        }
    };
    calendar.prototype.setMonthsTranslate = function(translate) {
        var self = this;
        translate = translate || self.monthsTranslate || 0;
        if (typeof self.monthsTranslate === 'undefined') self.monthsTranslate = translate;
        self.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
        var prevMonthTranslate = -(translate + 1) * 100;
        var currentMonthTranslate = -translate * 100;
        var nextMonthTranslate = -(translate - 1) * 100;
        self.months.eq(0).css({
            '-webkit-transform': 'translate3d('+(self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0)'
            // 'translate3d': (self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0'
        }).addClass('picker-calendar-month-prev');
        self.months.eq(1).css({
            '-webkit-transform': 'translate3d('+(self.isH ? currentMonthTranslate : 0) + '%, ' + (self.isH ? 0 : currentMonthTranslate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? currentMonthTranslate : 0) + '%, ' + (self.isH ? 0 : currentMonthTranslate) + '%, 0)'
            // 'translate3d': (self.isH ? currentMonthTranslate : 0) + '%, ' + (self.isH ? 0 : currentMonthTranslate) + '%, 0'
        }).addClass('picker-calendar-month-current');
        self.months.eq(2).css({
            '-webkit-transform': 'translate3d('+(self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0)'
            // 'translate3d': (self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0'
        }).addClass('picker-calendar-month-next');
    };
    calendar.prototype.nextMonth = function(transition) {
        var self = this;
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!self.params.animate) transition = 0;
        }
        var nextMonth = parseInt(self.months.eq(self.months.length - 1).attr('data-month'), 10);
        var nextYear = parseInt(self.months.eq(self.months.length - 1).attr('data-year'), 10);
        var nextDate = new Date(nextYear, nextMonth);
        var nextDateTime = nextDate.getTime();
        var transitionEndCallback = self.animating ? false : true;
        if (self.params.maxDate) {
            if (nextDateTime > new Date(self.params.maxDate).getTime()) {
                return self.resetMonth();
            }
        }
        self.monthsTranslate--;
        if (nextMonth === self.currentMonth) {
            var nextMonthTranslate = -(self.monthsTranslate) * 100;
            var nextMonthHTML = $(self.monthHTML(nextDateTime, 'next'))
                .css({
                    // 'transition': transition,
                    '-webkit-transform': 'translate3d('+(self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0)',
                    'transform': 'translate3d('+(self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0)'
                    // 'translate3d': (self.isH ? nextMonthTranslate : 0) + '%, ' + (self.isH ? 0 : nextMonthTranslate) + '%, 0'
                }).addClass('picker-calendar-month-next');
            self.wrapper.append(nextMonthHTML[0]);
            self.months = self.wrapper.find('.picker-calendar-month');
            if (self.params.onMonthAdd) {
                self.params.onMonthAdd(self, self.months.eq(self.months.length - 1)[0]);
            }
        }
        self.animating = true;
        self.onMonthChangeStart('next');
        var translate = (self.monthsTranslate * 100);

        self.wrapper.css({
            '-webkit-transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)'
            // 'translate3d': (self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0'
        });
        if (transitionEndCallback) {
            self.onMonthChangeEnd('next');
        }
        if (!self.params.animate) {
            self.onMonthChangeEnd('next');
        }
        self.animating = false;
    };
    calendar.prototype.prevMonth = function(transition) {
        var self = this;
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!self.params.animate) transition = 0;
        }
        var prevMonth = parseInt(self.months.eq(0).attr('data-month'), 10);
        var prevYear = parseInt(self.months.eq(0).attr('data-year'), 10);
        var prevDate = new Date(prevYear, prevMonth + 1, -1);
        var prevDateTime = prevDate.getTime();
        var transitionEndCallback = self.animating ? false : true;
        if (self.params.minDate) {
            if (prevDateTime < new Date(self.params.minDate).getTime()) {
                return self.resetMonth();
            }
        }
        self.monthsTranslate++;
        if (prevMonth === self.currentMonth) {
            var prevMonthTranslate = -(self.monthsTranslate) * 100;
            var prevMonthHTML = $(self.monthHTML(prevDateTime, 'prev'))
                .css({
                    // 'transition': transition,
                    '-webkit-transform': 'translate3d('+(self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0)',
                    'transform': 'translate3d('+(self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0)'
                    // 'translate3d': (self.isH ? prevMonthTranslate : 0) + '%, ' + (self.isH ? 0 : prevMonthTranslate) + '%, 0'
                }).addClass('picker-calendar-month-prev');
            self.wrapper.prepend(prevMonthHTML[0]);
            self.months = self.wrapper.find('.picker-calendar-month');
            if (self.params.onMonthAdd) {
                self.params.onMonthAdd(p, self.months.eq(0)[0]);
            }
        }
        self.animating = true;
        self.onMonthChangeStart('prev');
        var translate = (self.monthsTranslate * 100);
        self.wrapper.css({
            // 'transition': transition,
            '-webkit-transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)'
            // 'translate3d': (self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0'
        });
        if (transitionEndCallback) {
            self.onMonthChangeEnd('prev');
        }
        if (!self.params.animate) {
            self.onMonthChangeEnd('prev');
        }
        self.animating = false;
    };
    calendar.prototype.resetMonth = function(transition) {
        var self = this;
        if (typeof transition === 'undefined') transition = '';
        var translate = (self.monthsTranslate * 100);
        self.wrapper.css({
            '-webkit-transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0)'
            // 'translate3d': (self.isH ? translate : 0) + '%, ' + (self.isH ? 0 : translate) + '%, 0'
        });
    };
    calendar.prototype.setYearMonth = function(year, month, transition) {
        var self = this;
        if (typeof year === 'undefined') year = self.currentYear;
        if (typeof month === 'undefined') month = self.currentMonth;
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!self.params.animate) transition = 0;
        }
        var targetDate;
        if (year < self.currentYear) {
            targetDate = new Date(year, month + 1, -1).getTime();
        } else {
            targetDate = new Date(year, month).getTime();
        }
        if (self.params.maxDate && targetDate > new Date(self.params.maxDate).getTime()) {
            return false;
        }
        if (self.params.minDate && targetDate < new Date(self.params.minDate).getTime()) {
            return false;
        }
        var currentDate = new Date(self.currentYear, self.currentMonth).getTime();
        var dir = targetDate > currentDate ? 'next' : 'prev';
        var newMonthHTML = self.monthHTML(new Date(year, month));
        self.monthsTranslate = self.monthsTranslate || 0;
        var prevTranslate = self.monthsTranslate;
        var monthTranslate, wrapperTranslate;
        var transitionEndCallback = self.animating ? false : true;
        if (targetDate > currentDate) {
            // To next
            self.monthsTranslate--;
            if (!self.animating) self.months.eq(self.months.length - 1).remove();
            self.wrapper.append(newMonthHTML);
            self.months = self.wrapper.find('.picker-calendar-month');
            monthTranslate = -(prevTranslate - 1) * 100;
            self.months.eq(self.months.length - 1).css({
                // 'transition': transition,
                '-webkit-transform': 'translate3d('+(self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0)',
                'transform': 'translate3d('+(self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0)'
                // 'translate3d': (self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0'
            }).addClass('picker-calendar-month-next');
        } else {
            // To prev
            self.monthsTranslate++;
            if (!self.animating) self.months.eq(0).remove();
            self.wrapper.prepend(newMonthHTML);
            self.months = self.wrapper.find('.picker-calendar-month');
            monthTranslate = -(prevTranslate + 1) * 100;
            self.months.eq(0).css({
                // 'transition': transition,
                // 'translate3d': (self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0'
                '-webkit-transform': 'translate3d('+(self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0)',
                'transform': 'translate3d('+(self.isH ? monthTranslate : 0) + '%, ' + (self.isH ? 0 : monthTranslate) + '%, 0)'
            }).addClass('picker-calendar-month-prev');
        }
        if (self.params.onMonthAdd) {
            self.params.onMonthAdd(self, dir === 'next' ? self.months.eq(self.months.length - 1)[0] : self.months.eq(0)[0]);
        }
        self.animating = true;
        self.onMonthChangeStart(dir);
        wrapperTranslate = (self.monthsTranslate * 100);
        self.wrapper.css({
            // 'transition': transition,
            // 'translate3d': (self.isH ? wrapperTranslate : 0) + '%, ' + (self.isH ? 0 : wrapperTranslate) + '%, 0'
            '-webkit-transform': 'translate3d('+(self.isH ? wrapperTranslate : 0) + '%, ' + (self.isH ? 0 : wrapperTranslate) + '%, 0)',
            'transform': 'translate3d('+(self.isH ? wrapperTranslate : 0) + '%, ' + (self.isH ? 0 : wrapperTranslate) + '%, 0)'
        });
        if (transitionEndCallback) {
            self.onMonthChangeEnd(dir, true);
        }
        // if (!self.params.css) {
        //     self.onMonthChangeEnd(dir);
        // }
        self.animating = false;
    };
    calendar.prototype.nextYear = function() {
        var self = this;
        self.setYearMonth(self.currentYear + 1);
    };
    calendar.prototype.prevYear = function() {
        var self = this;
        self.setYearMonth(self.currentYear - 1);
    };
    // HTML Layout
    calendar.prototype.layout = function() {
        var self = this;
        var pickerHTML = '';
        var pickerClass = '';
        var i;

        var layoutDate = self.value && self.value.length ? self.value[0] : new Date().setHours(0, 0, 0, 0);
        var prevMonthHTML = self.monthHTML(layoutDate, 'prev');
        var currentMonthHTML = self.monthHTML(layoutDate);
        var nextMonthHTML = self.monthHTML(layoutDate, 'next');
        var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
        // Week days header
        var weekHeaderHTML = '';
        if (self.params.weekHeader) {
            for (i = 0; i < 7; i++) {
                var weekDayIndex = (i + self.params.firstDay > 6) ? (i - 7 + self.params.firstDay) : (i + self.params.firstDay);
                var dayName = self.params.dayNamesShort[weekDayIndex];
                weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((self.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';

            }
            weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
        }
        pickerClass = 'picker-modal picker-calendar ' + (self.params.cssClass || '');
        var toolbarHTML = self.params.toolbar ? self.params.toolbarTemplate.replace(/{{closeText}}/g, self.params.toolbarCloseText) : '';
        if (self.params.toolbar) {
            toolbarHTML = self.params.toolbarTemplate
                .replace(/{{closeText}}/g, self.params.toolbarCloseText)
                .replace(/{{monthPicker}}/g, (self.params.monthPicker ? self.params.monthPickerTemplate : ''))
                .replace(/{{yearPicker}}/g, (self.params.yearPicker ? self.params.yearPickerTemplate : ''));
        }
        var headerHTML = self.params.header ? self.params.headerTemplate.replace(/{{closeText}}/g, self.params.toolbarCloseText).replace(/{{placeholder}}/g, self.params.headerPlaceholder) : '';
        var footerHTML = self.params.footer ? self.params.footerTemplate.replace(/{{closeText}}/g, self.params.toolbarCloseText) : '';

        pickerHTML =
            '<div class="' + (pickerClass) + '">' +
            headerHTML +
            // footerHTML +
            toolbarHTML +
            '<div class="picker-modal-inner">' +
            weekHeaderHTML +
            monthsHTML +
            '</div>' +
            '</div>';

        self.pickerHTML = pickerHTML;
    };

    // Input Events
    calendar.prototype.openOnInput = function(e, self) {
        e.preventDefault();
        if (self.opened) return;
        self.open();
    };
    calendar.prototype.closeOnHTMLClick = function(e, self) {
        var self = this;
        if (self.inPopover()) return;
        if (self.input && self.input.length > 0) {
            if (e.target !== self.input[0] && $(e.target).parents('.picker-modal').length === 0) self.close();
        } else {
            if ($(e.target).parents('.picker-modal').length === 0) self.close();
        }
    };
    // Open
    calendar.prototype.onPickerClose = function() {
        var self = this;
        self.opened = false;
        if (self.input && self.input.length > 0) {
            self.input.trigger('blur');
        }
        if (self.params.onClose) self.params.onClose(self,self.value);

        // Destroy events
        self.destroyCalendarEvents();
    };

    calendar.prototype.open = function() {
        var self = this;
        var isPopover = self.isPopover();
        var updateValue = false;
        if (!self.opened) {
            // Set date value
            if (!self.value) {
                if (self.params.value) {
                    self.value = self.params.value;
                    updateValue = true;
                }
            }

            // Layout
            self.layout();

            // Append
            if (isPopover) {
                self.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + self.pickerHTML + '</div></div>';
                // self.popover = self.toPopover(self.pickerHTML, self.params.input, true);
                self.container = $(self.popover).find('.picker-modal');
                $(self.popover).on('close', function() {
                    self.onPickerClose();
                });
            } else if (self.inline) {
                self.container = $(self.pickerHTML);
                self.container.addClass('picker-modal-inline');
                $(self.params.container).append(self.container);
            } else {
                self.container = $(self.pickerModal(self.pickerHTML));
                $(self.container)
                    .on('close', function() {
                        self.onPickerClose();
                    });
            }

            // Store calendar instance
            self.container[0].f7Calendar = self;
            self.wrapper = self.container.find('.picker-calendar-months-wrapper');

            // Months
            self.months = self.wrapper.find('.picker-calendar-month');

            // Update current month and year
            self.updateCurrentMonthYear();

            // Set initial translate
            self.monthsTranslate = 0;
            self.setMonthsTranslate();

            // Init events
            self.initCalendarEvents();

            // Update input value
            if (updateValue) self.updateValue();
            else if (self.value) self.updateValue(true);

            if (self.input && self.input.length > 0) {
                self.input.trigger('focus');
            }

            $('.close-picker').on('tap',function(e){

                self.close(e);
                if (self.params.onFinish) self.params.onFinish(self,self.value);

            });

        }
        // Set flag
        self.opened = true;
        self.initialized = true;
        if (self.params.onMonthAdd) {
            self.months.each(function() {
                self.params.onMonthAdd(self, this);
            });
        }
        if (self.params.onOpen) self.params.onOpen(self);
    };
    calendar.prototype.toPopover = function(modal, target, removeOnClose) {
        var self = this;
        if (typeof removeOnClose === 'undefined') removeOnClose = true;
        if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
            var _modal = document.createElement('div');
            _modal.innerHTML = modal.trim();
            if (_modal.childNodes.length > 0) {
                modal = _modal.childNodes[0];
                if (removeOnClose) modal.classList.add('remove-on-close');
                $('body').append(modal);
            } else return false; //nothing found
        }
        modal = $(modal);
        target = $(target);
        if (modal.length === 0 || target.length === 0) return false;
        if (modal.find('.popover-angle').length === 0 && !self.params.material) {
            modal.append('<div class="popover-angle"></div>');
        }
        modal.show();

        var material = self.params.material;

        function sizePopover() {
            modal.css({
                left: '',
                top: ''
            });
            var modalWidth = modal.width();
            var modalHeight = modal.height(); // 13 - height of angle
            var modalAngle, modalAngleSize = 0,
                modalAngleLeft, modalAngleTop;
            if (!material) {
                modalAngle = modal.find('.popover-angle');
                modalAngleSize = modalAngle.width() / 2;
                modalAngle.removeClass('on-left on-right on-top on-bottom').css({
                    left: '',
                    top: ''
                });
            } else {
                modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({
                    left: '',
                    top: ''
                });
            }

            var targetWidth = target.outerWidth();
            var targetHeight = target.outerHeight();
            var targetOffset = target.offset();
            var targetParentPage = target.parents('.page');
            if (targetParentPage.length > 0) {
                targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
            }

            var windowHeight = $(window).height();
            var windowWidth = $(window).width();

            var modalTop = 0;
            var modalLeft = 0;
            var diff = 0;
            // Top Position
            var modalPosition = material ? 'bottom' : 'top';
            if (material) {
                if (modalHeight < windowHeight - targetOffset.top - targetHeight) {
                    // On bottom
                    modalPosition = 'bottom';
                    modalTop = targetOffset.top;
                } else if (modalHeight < targetOffset.top) {
                    // On top
                    modalTop = targetOffset.top - modalHeight + targetHeight;
                    modalPosition = 'top';
                } else {
                    // On middle
                    modalPosition = 'bottom';
                    modalTop = targetOffset.top;
                }

                if (modalTop <= 0) {
                    modalTop = 8;
                } else if (modalTop + modalHeight >= windowHeight) {
                    modalTop = windowHeight - modalHeight - 8;
                }

                // Horizontal Position
                modalLeft = targetOffset.left;
                if (modalLeft + modalWidth >= windowWidth - 8) {
                    modalLeft = targetOffset.left + targetWidth - modalWidth - 8;
                }
                if (modalLeft < 8) {
                    modalLeft = 8;
                }
                if (modalPosition === 'top') {
                    modal.addClass('popover-on-top');
                }
                if (modalPosition === 'bottom') {
                    modal.addClass('popover-on-bottom');
                }

            } else {
                if ((modalHeight + modalAngleSize) < targetOffset.top) {
                    // On top
                    modalTop = targetOffset.top - modalHeight - modalAngleSize;
                } else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
                    // On bottom
                    modalPosition = 'bottom';
                    modalTop = targetOffset.top + targetHeight + modalAngleSize;
                } else {
                    // On middle
                    modalPosition = 'middle';
                    modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
                    diff = modalTop;
                    if (modalTop <= 0) {
                        modalTop = 5;
                    } else if (modalTop + modalHeight >= windowHeight) {
                        modalTop = windowHeight - modalHeight - 5;
                    }
                    diff = diff - modalTop;
                }

                // Horizontal Position
                if (modalPosition === 'top' || modalPosition === 'bottom') {
                    modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
                    diff = modalLeft;
                    if (modalLeft < 5) modalLeft = 5;
                    if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                    if (modalPosition === 'top') {
                        modalAngle.addClass('on-bottom');
                    }
                    if (modalPosition === 'bottom') {
                        modalAngle.addClass('on-top');
                    }
                    diff = diff - modalLeft;
                    modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                    modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 6), 6);
                    modalAngle.css({
                        left: modalAngleLeft + 'px'
                    });

                } else if (modalPosition === 'middle') {
                    modalLeft = targetOffset.left - modalWidth - modalAngleSize;
                    modalAngle.addClass('on-right');
                    if (modalLeft < 5 || (modalLeft + modalWidth > windowWidth)) {
                        if (modalLeft < 5) modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                        if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                        modalAngle.removeClass('on-right').addClass('on-left');
                    }
                    modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                    modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 6), 6);
                    modalAngle.css({
                        top: modalAngleTop + 'px'
                    });
                }
            }

            // Apply Styles
            modal.css({
                top: modalTop + 'px',
                left: modalLeft + 'px'
            });
        }
        sizePopover();

        $(window).on('resize', sizePopover);
        modal.on('close', function() {
            $(window).off('resize', sizePopover);
        });

        self.openModal(modal);
        return modal[0];
    };

    // Close
    calendar.prototype.close = function() {
        var self = this;
        if (!self.opened || self.inline) {
            self.opened = false;
            return;
        } else {
            self.closeModal(self.popover);
            self.opened = false;
            return;
        }
    };

    calendar.prototype.closeModal = function() {
        var self = this;
        var modal = $('.picker-modal');

        // modal.hide();

        if (typeof modal !== 'undefined' && modal.length === 0) {
            return;
        }
        //var isPopover = modal.hasClass('popover');

        var removeOnClose = modal.hasClass('remove-on-close');

        var overlay = $('.picker-modal-overlay');
        if (overlay && overlay.length > 0) {
            overlay.removeClass('modal-overlay-visible');
        }

        modal.trigger('close');

        // Picker modal body class
        $('body').removeClass('with-picker-modal');
        $('body').addClass('picker-modal-closing');

        //if (!(isPopover)) {
        modal.removeClass('modal-in').addClass('modal-out');
        if (modal.hasClass('modal-out')) {
            modal.trigger('closed');
        } else {
            modal.trigger('opened');
        }
        //if (isPickerModal) {
        $('body').removeClass('picker-modal-closing');
        //}
        //if (isPickerModal || isPopover) {
        modal.removeClass('modal-out').hide();
        if (removeOnClose && modal.length > 0) {
            modal.remove();
        }
        //} else {
        //    modal.remove();
        //}
        //} else {
        //    modal.removeClass('modal-in modal-out').trigger('closed').hide();
        //    if (removeOnClose) {
        //        modal.remove();
        //    }
        //}

        return true;
    };
    calendar.prototype.pickerModal = function(pickerModal, removeOnClose) {
        var self = this;
        if (typeof removeOnClose === 'undefined') removeOnClose = true;
        if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
            pickerModal = $(pickerModal);
            if (pickerModal.length > 0) {
                if (removeOnClose) pickerModal.addClass('remove-on-close');
                $('body').append(pickerModal[0]);
            } else return false; //nothing found
        }
        pickerModal = $(pickerModal);
        if (pickerModal.length === 0) return false;
        pickerModal.show();
        self.openModal(pickerModal);
        return pickerModal[0];
    };

    calendar.prototype.openModal = function(modal) {
        modal = $(modal);
        var isModal = modal.hasClass('modal');
        var isPopover = modal.hasClass('popover');
        var isPickerModal = modal.hasClass('picker-modal');
        if (isModal) {
            modal.show();
            modal.css({
                marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
            });
        }

        var overlay;

        if (isPickerModal) {
            if (modal.hasClass('picker-calendar')) {
                if ($('.picker-modal-overlay').length === 0) {
                    $('body').append('<div class="picker-modal-overlay"></div>');
                }
                overlay = $('.picker-modal-overlay');
                overlay.addClass('modal-overlay-visible');
            }
        }

        //Make sure that styles are applied, trigger relayout;
        var clientLeft = modal[0].clientLeft;

        // Trugger open event
        modal.trigger('open');

        // Picker modal body class
        if (isPickerModal) {
            $('body').addClass('with-picker-modal');
        }

        modal.removeClass('modal-out').addClass('modal-in');
        if (modal.hasClass('modal-out')) modal.trigger('closed');
        else modal.trigger('opened');
        return true;
    };

    // Destroy
    calendar.prototype.destroy = function() {
        var self = this;
        self.close();
        if (self.params.input && self.input.length > 0) {
            self.input.off('click focus', function(e) {
                self.openOnInput(e, self);
            });
        }
        $('html').off('tap', function(e) {
            self.closeOnHTMLClick(e, self);
        });
    };

    module.exports = calendar;
