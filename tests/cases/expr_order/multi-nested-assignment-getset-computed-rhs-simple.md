# Preval test case

# multi-nested-assignment-getset.md

> expr_order > multi-nested-assignment-getset
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test whether any step can affect the value of `e` before it is used as the value to update all the properties.

#TODO

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, '::', ...a]); return a[0]; }
var obja = {get a(){ $$('a.get'); return 110; }, set a(x) { $$('a.set', x); e = 'faila'; return 1000; } };
var objb = {get b(){ $$('b.get'); a = 210; return 100; }, set b(x) { $$('b.set', x); a = 2100; e = 'failb'; return 2000; } };
var objc = {get c(){ $$('c.get'); a = 310; b = 320; return 100; }, set c(x) { $$('c.set', x); a = 3100; b = 3200; e = 'failc'; return 3000; } };
var objd = {get d(){ $$('d.get'); a = 410; b = 420; c = 430; return 100; }, set d(x) { $$('d.set', x); a = 4100; b = 4200; c = 4300; e = 'faild'; return 4000; } };
var a = function(){ $$('a'); return obja; }
var b = function(){ $$('b'); a = 21; return objb; }
var c = function(){ $$('c'); a = 31; b = 32; return objc; }
var d = function(){ $$('d'); a = 41; b = 42; c = 43; return objd; }
var e = 12345;
$$(a()[$$('a')] = b()[$$('b')] = c()[$$('c')] = d()[$$('d')] = e)
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Normalized

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, '::', ...a_1];
  $(tmpArg);
  {
    let tmpStmtArg = a_1[0];
    return tmpStmtArg;
  }
}
var obja;
var objb;
var objc;
var objd;
var a;
var b;
var c;
var d;
var e;
var tmpArg_1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $$('b.set', x_1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    $$('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x_2) {
    $$('c.set', x_2);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    $$('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x_3) {
    $$('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  $$('a');
  return obja;
};
b = function () {
  $$('b');
  a = 21;
  return objb;
};
c = function () {
  $$('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $$('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
tmpNestedAssignCompMemberObj = a();
tmpNestedAssignCompMemberProp = $$('a');
tmpNestedAssignCompMemberObj_1 = b();
tmpNestedAssignCompMemberProp_1 = $$('b');
tmpNestedAssignCompMemberObj_2 = c();
tmpNestedAssignCompMemberProp_2 = $$('c');
tmpNestedAssignComMemberObj = d();
tmpNestedAssignComMemberProp = $$('d');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = e;
tmpNestedAssignCompMemberRhs_2 = e;
tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberRhs_1 = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg_1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg_1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, '::', ...a_1];
  $(tmpArg);
  let tmpStmtArg = a_1[0];
  return tmpStmtArg;
}
var obja;
var objb;
var objc;
var objd;
var a;
var b;
var c;
var d;
var e;
var tmpArg_1;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $$('b.set', x_1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    $$('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x_2) {
    $$('c.set', x_2);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    $$('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x_3) {
    $$('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  $$('a');
  return obja;
};
b = function () {
  $$('b');
  a = 21;
  return objb;
};
c = function () {
  $$('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $$('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
tmpNestedAssignCompMemberObj = a();
tmpNestedAssignCompMemberProp = $$('a');
tmpNestedAssignCompMemberObj_1 = b();
tmpNestedAssignCompMemberProp_1 = $$('b');
tmpNestedAssignCompMemberObj_2 = c();
tmpNestedAssignCompMemberProp_2 = $$('c');
tmpNestedAssignComMemberObj = d();
tmpNestedAssignComMemberProp = $$('d');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = e;
tmpNestedAssignCompMemberRhs_2 = e;
tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberRhs_1 = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg_1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg_1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Result

Should call `$` with:
 - 0: ["$:",["a"],null,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","a"]
 - 1: ["$:",["a"],null,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","a"]
 - 2: ["$:",["b"],null,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","b"]
 - 3: ["$:",["b"],null,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","b"]
 - 4: ["$:",["c"],null,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","c"]
 - 5: ["$:",["c"],32,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","c"]
 - 6: ["$:",["d"],32,null,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","d"]
 - 7: ["$:",["d"],42,43,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","d"]
 - 8: ["$:",["d.set",12345],42,43,null,12345,{"a":110},{"b":100},{"c":100},{"d":100},"::","d.set",12345]
 - 9: ["$:",["c.set",12345],4200,4300,null,"faild",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.set",12345]
 - 10: ["$:",["b.set",12345],3200,4300,null,"failc",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.set",12345]
 - 11: ["$:",["a.set",12345],3200,4300,null,"failb",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.set",12345]
 - 12: ["$:",[12345],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::",12345]
 - 13: ["$:",[2100,3200,4300,null,"faila"],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::",2100,3200,4300,null,"faila"]
 - 14: ["$:",[{"a":110},{"b":100},{"c":100},{"d":100}],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::",{"a":110},{"b":100},{"c":100},{"d":100}]
 - 15: undefined
 - 16: ["$:",["a.get"],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 17: ["$:",["b.get"],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 18: ["$:",["c.get"],3200,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 19: ["$:",["d.get"],320,4300,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 20: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 21: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 22: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 23: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 24: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 25: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 26: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 27: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 28: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 29: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 30: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 31: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 32: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 33: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 34: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 35: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 36: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 37: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 38: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 39: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 40: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 41: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 42: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 43: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 44: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 45: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 46: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 47: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 48: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 49: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 50: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 51: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 52: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 53: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 54: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 55: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 56: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 57: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 58: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 59: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 60: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 61: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 62: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 63: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 64: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 65: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 66: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 67: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 68: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 69: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 70: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 71: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 72: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 73: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 74: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 75: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 76: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 77: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 78: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 79: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]
 - 80: ["$:",["a.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","a.get"]
 - 81: ["$:",["b.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","b.get"]
 - 82: ["$:",["c.get"],420,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","c.get"]
 - 83: ["$:",["d.get"],320,430,null,"faila",{"a":110},{"b":100},{"c":100},{"d":100},"::","d.get"]

Normalized calls: BAD?!
[
  [['$:', ['a'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a']],
  [['$:', ['a'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a']],
  [['$:', ['b'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b']],
  [['$:', ['b'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b']],
  [['$:', ['c'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c']],
  [['$:', ['c'], 32, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c']],
  [['$:', ['d'], 32, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd']],
  [['$:', ['d'], 42, 43, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd']],
  [['$:', ['d.set', 12345], 42, 43, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd.set', 12345]],
  [['$:', ['c.set', 'faild'], 4200, 4300, null, 'faild', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c.set', 'faild']],
  [['$:', ['b.set', 'faild'], 3200, 4300, null, 'failc', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b.set', 'faild']],
  [['$:', ['a.set', 'faild'], 3200, 4300, null, 'failb', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a.set', 'faild']],
  [['$:', ['faild'], 3200, 4300, null, 'faila', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'faild']],
  [
    [
      '$:',
      [2100, 3200, 4300, null, 'faila'],
      3200,
      4300,
      null,
      'faila',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
      '::',
      2100,
      3200,
      4300,
      null,
      'faila',
    ],
  ],
  [
    [
      '$:',
      [{ a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }],
      3200,
      4300,
      null,
      'faila',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
      '::',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
    ],
  ],
  null,
];

Final output calls: BAD!!
[
  [['$:', ['a'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a']],
  [['$:', ['a'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a']],
  [['$:', ['b'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b']],
  [['$:', ['b'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b']],
  [['$:', ['c'], null, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c']],
  [['$:', ['c'], 32, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c']],
  [['$:', ['d'], 32, null, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd']],
  [['$:', ['d'], 42, 43, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd']],
  [['$:', ['d.set', 12345], 42, 43, null, 12345, { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'd.set', 12345]],
  [['$:', ['c.set', 'faild'], 4200, 4300, null, 'faild', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'c.set', 'faild']],
  [['$:', ['b.set', 'faild'], 3200, 4300, null, 'failc', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'b.set', 'faild']],
  [['$:', ['a.set', 'faild'], 3200, 4300, null, 'failb', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'a.set', 'faild']],
  [['$:', ['faild'], 3200, 4300, null, 'faila', { a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }, '::', 'faild']],
  [
    [
      '$:',
      [2100, 3200, 4300, null, 'faila'],
      3200,
      4300,
      null,
      'faila',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
      '::',
      2100,
      3200,
      4300,
      null,
      'faila',
    ],
  ],
  [
    [
      '$:',
      [{ a: 110 }, { b: 100 }, { c: 100 }, { d: 100 }],
      3200,
      4300,
      null,
      'faila',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
      '::',
      { a: 110 },
      { b: 100 },
      { c: 100 },
      { d: 100 },
    ],
  ],
  null,
];

