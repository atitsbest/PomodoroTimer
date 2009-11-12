/**
 * @class: PomodoroController
 */
var PomodoroController = function() {
  // Members:
  this.POMODORO_DURATION_IN_MINUTES = 1;
  this.remainingSeconds = this.POMODORO_DURATION_IN_MINUTES * 60;
  // Liste der fertigen Pomodori
  this.pomodoriCount = 1;

  // Pausen und Pomodori.
  this.timerDurationsInMinutes = [25, 5, 25, 5, 25, 5, 25, 15];
  this.currentTimer = 0;

  // Timer:
  this.timerHandle = null;

  // Elemente:
  this.$timer = $('#timer');
  this.$minutes = this.$timer.find('.minutes');
  this.$seconds = this.$timer.find('.seconds');
  this.$controls = $('#controls');
  this.$startPomodoro = this.$controls.find('.start');
  this.$cancelPomodoro = this.$controls.find('.cancel');
  this.$pomodori = $('#pomodori > li');

  this.init();
}

PomodoroController.prototype = {
  /**
   * CTR
   */
  init: function() {
    var that = this;

    // Events registrieren:
    this.$startPomodoro.click(function() { that.onStartPomodoro(); });
    this.$cancelPomodoro.click(function() { that.onCancelPomodoro(); });
  },

  /**
   * Der Pomodoro wird gestartet.
   */
  onStartPomodoro: function() {
    var that = this;

    // Zeit auf die volle Dauer setzen.
    this.remainingSeconds = this.timerDurationsInMinutes[this.currentTimer] * 60;

    // Interval installieren.
    this.timerHandle = window.setInterval(function() {
      that.onTimerIntervall();
    },
    1000);

    // Controls wechseln:
    this.$startPomodoro.hide();
    this.$cancelPomodoro.show();

    this._displayPomodori();
  },

  /**
   * Pomodoro wird abgebrochen (zählt also nicht).
   */
  onCancelPomodoro: function() {
    if (this.timerHandle) {
      window.clearInterval(this.timerHandle);
    }

    // Controls in Ausgangsposition.
    this.$startPomodoro.show();
    this.$cancelPomodoro.hide();
  },

  /**
   * Wird jede Sekunde aufgerufen.
   */
  onTimerIntervall: function() {
    this.remainingSeconds -= 1;
    this.$minutes.html(this._formatLeadingZero(parseInt(this.remainingSeconds / 60)));
    this.$seconds.html(this._formatLeadingZero(this.remainingSeconds % 60));

    // Der Pomodoro ist fertig.
    if (this.remainingSeconds == 0) {
      this._pomodoroFinished();
    }
  },

  /**
   * Der aktuelle Pomodoro wurde gerade beendet.
   */
  _pomodoroFinished: function() {

    this.onCancelPomodoro();


    // Anzahl der fertigen Pomodori ermitteln.
    if ((this.currentTimer % 2) == 0) {
      setTimeout(function() { $.sound.play('sounds/ringin.wav'); }, 10);
      this.pomodoriCount += 1;
      // Nie mehr als 4 Pomodori:
      if (this.pomodoriCount > 4)
        this.pomodoriCount = 1;
    }

    // Nächster Durchlauf.
    this.currentTimer += 1;
    if (this.currentTimer >= this.timerDurationsInMinutes.length)
      this.currentTimer = 0;

    this.onStartPomodoro();
  },

  /**
   * Zeigt die fertigen und den aktuellen Pomodoro an.
   */
  _displayPomodori: function() {
    var that = this;

    // Anzahl der fertigen Pomodori anzeigen.
    this.$pomodori.each(function(index, li) {
      var $li = $(li);
      if (index < that.pomodoriCount && !$li.is(':visible')) {
        $li.show('fast');
      }
      else if (index >= that.pomodoriCount) {
        $li.hide();
      }
    });
  },

  /**
   * Hilfsfunktion: Fügt eine 0 bei einstelligen Zahlen an.
   */
  _formatLeadingZero: function(number) {
    return number < 10
      ? "0" + number
      : number.toString();
  }
};

var app = new PomodoroController();