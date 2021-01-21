# Preval test case

# multi-nested-assignment-getset.md

> expr_order > multi-nested-assignment-getset
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test the order of calling an object, property, and rhs when assigning a complex value to a complex member expression with computed property.

#TODO

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a]); return a[0]; }
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
$$(a()[$$('a')] = b()[$$('b')] = c()[$$('c')] = d()[$$('d')] = e())
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Normalized

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
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
var obje;
var a;
var b;
var c;
var d;
var e;
var tmpArg_1;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignComMemberObj_2;
var tmpNestedAssignComMemberProp_2;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignObj_3;
var tmpNestedAssignComMemberObj_3;
var tmpNestedAssignComMemberProp_3;
var tmpNestedAssignCompMemberObj_3;
var tmpNestedAssignCompMemberProp_3;
var tmpNestedAssignCompMemberRhs_3;
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
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $$('a');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj_1 = b();
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $$('b');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignObj_2 = c();
tmpNestedAssignComMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignComMemberProp_2 = $$('c');
tmpNestedAssignCompMemberObj_2 = tmpNestedAssignComMemberObj_2;
tmpNestedAssignCompMemberProp_2 = tmpNestedAssignComMemberProp_2;
tmpNestedAssignObj_3 = d();
tmpNestedAssignComMemberObj_3 = tmpNestedAssignObj_3;
tmpNestedAssignComMemberProp_3 = $$('d');
tmpNestedAssignCompMemberObj_3 = tmpNestedAssignComMemberObj_3;
tmpNestedAssignCompMemberProp_3 = tmpNestedAssignComMemberProp_3;
tmpNestedAssignCompMemberRhs_3 = e();
tmpNestedAssignCompMemberObj_3[tmpNestedAssignCompMemberProp_3] = tmpNestedAssignCompMemberRhs_3;
tmpNestedAssignCompMemberRhs_2 = tmpNestedAssignCompMemberRhs_3;
tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberRhs_1 = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg_1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg_1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  $(tmpArg);
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
var tmpArg_1;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignComMemberObj_1;
var tmpNestedAssignComMemberProp_1;
var tmpNestedAssignCompMemberObj_1;
var tmpNestedAssignCompMemberProp_1;
var tmpNestedAssignCompMemberRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignComMemberObj_2;
var tmpNestedAssignComMemberProp_2;
var tmpNestedAssignCompMemberObj_2;
var tmpNestedAssignCompMemberProp_2;
var tmpNestedAssignCompMemberRhs_2;
var tmpNestedAssignObj_3;
var tmpNestedAssignComMemberObj_3;
var tmpNestedAssignComMemberProp_3;
var tmpNestedAssignCompMemberObj_3;
var tmpNestedAssignCompMemberProp_3;
var tmpNestedAssignCompMemberRhs_3;
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
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $$('a');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj_1 = b();
tmpNestedAssignComMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignComMemberProp_1 = $$('b');
tmpNestedAssignCompMemberObj_1 = tmpNestedAssignComMemberObj_1;
tmpNestedAssignCompMemberProp_1 = tmpNestedAssignComMemberProp_1;
tmpNestedAssignObj_2 = c();
tmpNestedAssignComMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignComMemberProp_2 = $$('c');
tmpNestedAssignCompMemberObj_2 = tmpNestedAssignComMemberObj_2;
tmpNestedAssignCompMemberProp_2 = tmpNestedAssignComMemberProp_2;
tmpNestedAssignObj_3 = d();
tmpNestedAssignComMemberObj_3 = tmpNestedAssignObj_3;
tmpNestedAssignComMemberProp_3 = $$('d');
tmpNestedAssignCompMemberObj_3 = tmpNestedAssignComMemberObj_3;
tmpNestedAssignCompMemberProp_3 = tmpNestedAssignComMemberProp_3;
tmpNestedAssignCompMemberRhs_3 = e();
tmpNestedAssignCompMemberObj_3[tmpNestedAssignCompMemberProp_3] = tmpNestedAssignCompMemberRhs_3;
tmpNestedAssignCompMemberRhs_2 = tmpNestedAssignCompMemberRhs_3;
tmpNestedAssignCompMemberObj_2[tmpNestedAssignCompMemberProp_2] = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberRhs_1 = tmpNestedAssignCompMemberRhs_2;
tmpNestedAssignCompMemberObj_1[tmpNestedAssignCompMemberProp_1] = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs_1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg_1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg_1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Result

Should call `$` with:
 - 0: ["$:",["a"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a"]
 - 1: ["$:",["a"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a"]
 - 2: ["$:",["b"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b"]
 - 3: ["$:",["b"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b"]
 - 4: ["$:",["c"],null,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c"]
 - 5: ["$:",["c"],32,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c"]
 - 6: ["$:",["d"],32,null,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d"]
 - 7: ["$:",["d"],42,43,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d"]
 - 8: ["$:",["e"],42,43,null,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","e"]
 - 9: ["$:",["d.set",{"e":100}],52,53,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","d.set",{"e":100}]
 - 10: ["$:",["c.set",{"e":100}],4200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","c.set",{"e":100}]
 - 11: ["$:",["b.set",{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","b.set",{"e":100}]
 - 12: ["$:",["a.set",{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::","a.set",{"e":100}]
 - 13: ["$:",[{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",{"e":100}]
 - 14: ["$:",[2100,3200,4300,54,null],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",2100,3200,4300,54,null]
 - 15: ["$:",[{"a":110},{"b":100},{"c":100},{"d":100},{"e":100}],3200,4300,54,null,{"a":110},{"b":100},{"c":100},{"d":100},{"e":100},"::",{"a":110},{"b":100},{"c":100},{"d":100},{"e":100}]
 - 16: undefined

Normalized calls: Same

Final output calls: Same
