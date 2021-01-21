# Preval test case

# multi-nested-assignment-getset.md

> expr_order > multi-nested-assignment-getset
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test the order of calling an object, property, and rhs when assigning a complex value to a complex member expression with regular property.

#TODO

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a], {depth: null}); return a[0]; }
var obja = {get a(){ $$('a.get'); return 110; }, set a(x) { $$('a.set', x); return 1000; } };
var objb = {get b(){ $$('b.get'); a = 210; return 100; }, set b(x) { $$('b.set', x); a = 2100; return 2000; } };
var objc = {get c(){ $$('c.get'); a = 310; b = 320; return 100; }, set c(x) { $$('c.set', x); a = 3100; b = 3200; return 3000; } };
var objd = {get d(){ $$('d.get'); a = 410; b = 420; c = 430; return 100; }, set d(x) { $$('d.set', x); a = 4100; b = 4200; c = 4300; return 4000; } };
var obje = {get e(){ $$('e.get'); a = 510; b = 520; c = 530; d = 540; return 100; }, set e(x) { $$('e.set', x); a = 5100; b = 5200; c = 5300; d = 5400; return 5000; } };
var a = function(){ $$('a'); return obja; }
var b = function(){ $$('b'); a = 21; return objb; }
var c = function(){ $$('c'); a = 31; b = 32; return objc; }
var d = function(){ $$('d'); a = 41; b = 42; c = 43; return objd; }
var e = function(){ $$('e'); a = 51; b = 52; c = 53; d = 54; return obje }
$$(a().a = b().b = c().c = d().d = e())
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Normalized

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  var tmpArg_1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg_1 = { depth: null };
  $(tmpArg, tmpArg_1);
  {
    let tmpStmtArg = a_1[0];
    return tmpStmtArg;
  }
}
var obja;
var objb;
var objc;
var objd;
var obje;
var a;
var b;
var c;
var d;
var e;
var tmpArg_2;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
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
    return 4000;
  },
};
obje = {
  get e() {
    $$('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $$('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
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
e = function () {
  $$('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
tmpNestedAssignMemberObj = a();
tmpNestedAssignMemberObj_1 = b();
tmpNestedAssignMemberObj_2 = c();
tmpNestedAssignMemberObj_3 = d();
tmpNestedAssignMemberRhs_3 = e();
tmpNestedAssignMemberObj_3.d = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberObj_2.c = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.b = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.a = tmpNestedAssignMemberRhs;
tmpArg_2 = tmpNestedAssignMemberRhs;
$$(tmpArg_2);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  var tmpArg_1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg_1 = { depth: null };
  $(tmpArg, tmpArg_1);
  let tmpStmtArg = a_1[0];
  return tmpStmtArg;
}
var obja;
var objb;
var objc;
var objd;
var obje;
var a;
var b;
var c;
var d;
var e;
var tmpArg_2;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
var tmpNestedAssignMemberObj_3;
var tmpNestedAssignMemberRhs_3;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
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
    return 4000;
  },
};
obje = {
  get e() {
    $$('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $$('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
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
e = function () {
  $$('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
tmpNestedAssignMemberObj = a();
tmpNestedAssignMemberObj_1 = b();
tmpNestedAssignMemberObj_2 = c();
tmpNestedAssignMemberObj_3 = d();
tmpNestedAssignMemberRhs_3 = e();
tmpNestedAssignMemberObj_3.d = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberRhs_2 = tmpNestedAssignMemberRhs_3;
tmpNestedAssignMemberObj_2.c = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.b = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.a = tmpNestedAssignMemberRhs;
tmpArg_2 = tmpNestedAssignMemberRhs;
$$(tmpArg_2);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Result

Should call `$` with:
 - 0: ["$:",["a"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a"],{"depth":null}
 - 1: ["$:",["b"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b"],{"depth":null}
 - 2: ["$:",["c"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c"],{"depth":null}
 - 3: ["$:",["d"],32,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d"],{"depth":null}
 - 4: ["$:",["e"],42,43,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e"],{"depth":null}
 - 5: ["$:",["d.set",{"e":100}],52,53,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.set",{"e":100}],{"depth":null}
 - 6: ["$:",["c.set",{"e":100}],4200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.set",{"e":100}],{"depth":null}
 - 7: ["$:",["b.set",{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.set",{"e":100}],{"depth":null}
 - 8: ["$:",["a.set",{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.set",{"e":100}],{"depth":null}
 - 9: ["$:",[{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",{"e":100}],{"depth":null}
 - 10: ["$:",[2100,3200,4300,54,null],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",2100,3200,4300,54,null],{"depth":null}
 - 11: ["$:",[{"a":110},{"b":100},{"c":100},{"d":100},{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",{"a":110},{"b":100},{"c":100},{"d":100},{"e":100}],{"depth":null}
 - 12: undefined
 - 13: ["$:",["a.get"],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 14: ["$:",["b.get"],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 15: ["$:",["c.get"],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 16: ["$:",["d.get"],320,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 17: ["$:",["e.get"],420,430,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 18: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 19: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 20: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 21: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 22: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 23: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 24: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 25: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 26: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 27: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 28: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 29: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 30: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 31: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 32: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 33: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 34: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 35: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 36: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 37: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 38: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 39: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 40: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 41: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 42: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 43: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 44: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 45: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 46: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 47: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 48: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 49: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 50: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 51: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 52: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 53: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 54: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 55: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 56: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 57: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 58: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 59: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 60: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 61: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 62: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 63: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 64: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 65: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 66: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 67: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 68: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 69: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 70: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 71: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 72: ["$:",["e.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 73: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 74: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 75: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 76: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 77: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 78: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 79: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 80: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 81: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 82: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 83: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 84: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 85: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 86: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 87: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}
 - 88: ["$:",["a.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.get"],{"depth":null}
 - 89: ["$:",["b.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.get"],{"depth":null}
 - 90: ["$:",["c.get"],520,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.get"],{"depth":null}
 - 91: ["$:",["d.get"],320,530,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.get"],{"depth":null}
 - 92: ["$:",["e.get"],420,430,540,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e.get"],{"depth":null}

Normalized calls: Same

Final output calls: Same
