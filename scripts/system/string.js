/**
 * Erweiterungen zum String-Objekt.
 */
if (!(new String).trim) {
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,''); };
}
if (!(new String).normalize && (new String).trim) {
	String.prototype.normalize = String.prototype.normalise = function() { return this.trim().replace(/\s+/g,' '); };
}
if (!(new String).startsWith) {
	String.prototype.startsWith = function(str,i){ i=(i)?'i':'';var re=new RegExp('^'+str,i);return (this.normalize().match(re)) ? true : false ; };
}
if (!(new String).endsWith) {
	String.prototype.endsWith = function(str,i){ i=(i)?'gi':'g';var re=new RegExp(str+'$',i);return (this.normalize().match(re)) ? true : false ; };
}

/**
 * Zufallsstring
 */
String.prototype.rand = function(length) {
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var randomstring = '';
	for (var i=0; i<length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

/**
 * Format z.b.: var msg = 'Mein Name ist {0}.'.format('Stephan');
 */
String.prototype.format = function() {
  var str = this;

  for(var i=0;i<arguments.length;i++) {
    var re = new RegExp('\\{' + (i) + '\\}','gm');
    str = str.replace(re, arguments[i]);
  }

  return str;
}

/**
 * Erstellt ein eine GUID.
 */
String.generateGuid = function() {
  var result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j == 8 || j == 12|| j == 16|| j == 20)
      result = result + '-';
    
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
} 