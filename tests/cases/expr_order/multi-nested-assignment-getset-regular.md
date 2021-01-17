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
function $(...a) { console.dir(['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a], {depth: null}); return a[0]; }
var obja = {get a(){ $('a.get'); return 110; }, set a(x) { $('a.set', x); return 1000; } };
var objb = {get b(){ $('b.get'); a = 210; return 100; }, set b(x) { $('b.set', x); a = 2100; return 2000; } };
var objc = {get c(){ $('c.get'); a = 310; b = 320; return 100; }, set c(x) { $('c.set', x); a = 3100; b = 3200; return 3000; } };
var objd = {get d(){ $('d.get'); a = 410; b = 420; c = 430; return 100; }, set d(x) { $('d.set', x); a = 4100; b = 4200; c = 4300; return 4000; } };
var obje = {get e(){ $('e.get'); a = 510; b = 520; c = 530; d = 540; return 100; }, set e(x) { $('e.set', x); a = 5100; b = 5200; c = 5300; d = 5400; return 5000; } };
var a = function(){ $('a'); return obja; }
var b = function(){ $('b'); a = 21; return objb; }
var c = function(){ $('c'); a = 31; b = 32; return objc; }
var d = function(){ $('d'); a = 41; b = 42; c = 43; return objd; }
var e = function(){ $('e'); a = 51; b = 52; c = 53; d = 54; return obje }
$(a().a = b().b = c().c = d().d = e())
$(a, b, c, d, e);
$(obja, objb, objc, objd, obje);
`````

## Normalized

`````js filename=intro
function $_1(...a_1) {
  var tmpArg;
  var tmpArg_1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg_1 = { depth: null };
  console.dir(tmpArg, tmpArg_1);
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
    $_1('a.get');
    return 110;
  },
  set a(x) {
    $_1('a.set', x);
    return 1000;
  },
};
objb = {
  get b() {
    $_1('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $_1('b.set', x_1);
    a = 2100;
    return 2000;
  },
};
objc = {
  get c() {
    $_1('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x_2) {
    $_1('c.set', x_2);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
objd = {
  get d() {
    $_1('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x_3) {
    $_1('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
obje = {
  get e() {
    $_1('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $_1('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
a = function () {
  $_1('a');
  return obja;
};
b = function () {
  $_1('b');
  a = 21;
  return objb;
};
c = function () {
  $_1('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $_1('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = function () {
  $_1('e');
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
$_1(tmpArg_2);
$_1(a, b, c, d, e);
$_1(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $_1(...a_1) {
  var tmpArg;
  var tmpArg_1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg_1 = { depth: null };
  console.dir(tmpArg, tmpArg_1);
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
    $_1('a.get');
    return 110;
  },
  set a(x) {
    $_1('a.set', x);
    return 1000;
  },
};
objb = {
  get b() {
    $_1('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $_1('b.set', x_1);
    a = 2100;
    return 2000;
  },
};
objc = {
  get c() {
    $_1('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x_2) {
    $_1('c.set', x_2);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
objd = {
  get d() {
    $_1('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x_3) {
    $_1('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
obje = {
  get e() {
    $_1('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $_1('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
a = function () {
  $_1('a');
  return obja;
};
b = function () {
  $_1('b');
  a = 21;
  return objb;
};
c = function () {
  $_1('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $_1('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = function () {
  $_1('e');
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
$_1(tmpArg_2);
$_1(a, b, c, d, e);
$_1(obja, objb, objc, objd, obje);
`````
