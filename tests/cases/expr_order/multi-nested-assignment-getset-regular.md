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
  var tmpArg$1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg$1 = { depth: null };
  $(tmpArg, tmpArg$1);
  {
    let tmpReturnArg = a_1[0];
    return tmpReturnArg;
  }
}
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
var obje;
var tmpArg$2;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
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
tmpNestedAssignObj = a();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = b();
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignObj$2 = c();
tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignObj$3 = d();
tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$3;
tmpNestedAssignMemberRhs$3 = e();
tmpNestedAssignMemberObj$3.d = tmpNestedAssignMemberRhs$3;
tmpNestedAssignMemberRhs$2 = tmpNestedAssignMemberRhs$3;
tmpNestedAssignMemberObj$2.c = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberRhs$1 = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberObj$1.b = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.a = tmpNestedAssignMemberRhs;
tmpArg$2 = tmpNestedAssignMemberRhs;
$$(tmpArg$2);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  var tmpArg$1;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpArg$1 = { depth: null };
  $(tmpArg, tmpArg$1);
  let tmpReturnArg = a_1[0];
  return tmpReturnArg;
}
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
var obje;
var tmpArg$2;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberObj$3;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignMemberRhs$3;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignObj$3;
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
tmpNestedAssignObj = a();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = b();
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignObj$2 = c();
tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignObj$3 = d();
tmpNestedAssignMemberObj$3 = tmpNestedAssignObj$3;
tmpNestedAssignMemberRhs$3 = e();
tmpNestedAssignMemberObj$3.d = tmpNestedAssignMemberRhs$3;
tmpNestedAssignMemberRhs$2 = tmpNestedAssignMemberRhs$3;
tmpNestedAssignMemberObj$2.c = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberRhs$1 = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberObj$1.b = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.a = tmpNestedAssignMemberRhs;
tmpArg$2 = tmpNestedAssignMemberRhs;
$$(tmpArg$2);
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

Normalized calls: Same

Final output calls: Same
