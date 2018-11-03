'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

function getAllEvents(event) {
    const tokens = event.split('.');
    const events = [];

    for (let i = tokens.length; i > 0; i--) {
        events.push(tokens.slice(0, i)
            .join('.'));
    }

    return events;
}

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    const subscriptions = new Map();

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!subscriptions.has(event)) {
                const contexts = new Map();
                contexts.set(context, []);
                subscriptions.set(event, contexts);
            }
            if (!subscriptions.get(event)
                .has(context)) {
                subscriptions.get(event).set(context, []);
            }
            subscriptions.get(event)
                .get(context)
                .push(handler);

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            subscriptions.get(event).delete(context);

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            const events = getAllEvents(event);

            for (let i = 0; i < events.length; i++) {
                if (!subscriptions.has(events[i])) {
                    continue;
                }

                subscriptions.get(events[i])
                    .forEach((handlers, context) =>
                        handlers
                            .forEach(handler =>
                                handler.call(context)));
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
