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
    let tmpReturnArg = a_1[0];
    return tmpReturnArg;
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
var tmpArg$1;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignObj$3;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp$3;
var tmpNestedPropAssignRhs;
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
tmpNestedAssignObj = a();
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $$('a');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj$1 = b();
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $$('b');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignObj$2 = c();
tmpNestedAssignComMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignComMemberProp$2 = $$('c');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$3 = d();
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$3;
tmpNestedAssignComMemberProp$3 = $$('d');
tmpNestedPropAssignRhs = e;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs;
tmpNestedAssignCompMemberRhs$2 = tmpNestedPropAssignRhs;
tmpNestedAssignCompMemberObj$2[tmpNestedAssignCompMemberProp$2] = tmpNestedAssignCompMemberRhs$2;
tmpNestedAssignCompMemberRhs$1 = tmpNestedAssignCompMemberRhs$2;
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg$1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg$1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  var tmpArg;
  tmpArg = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, '::', ...a_1];
  $(tmpArg);
  let tmpReturnArg = a_1[0];
  return tmpReturnArg;
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
var tmpArg$1;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpNestedAssignObj$1;
var tmpNestedAssignComMemberObj$1;
var tmpNestedAssignComMemberProp$1;
var tmpNestedAssignCompMemberObj$1;
var tmpNestedAssignCompMemberProp$1;
var tmpNestedAssignCompMemberRhs$1;
var tmpNestedAssignObj$2;
var tmpNestedAssignComMemberObj$2;
var tmpNestedAssignComMemberProp$2;
var tmpNestedAssignCompMemberObj$2;
var tmpNestedAssignCompMemberProp$2;
var tmpNestedAssignCompMemberRhs$2;
var tmpNestedAssignObj$3;
var tmpNestedAssignComMemberObj$3;
var tmpNestedAssignComMemberProp$3;
var tmpNestedPropAssignRhs;
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
tmpNestedAssignObj = a();
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $$('a');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
tmpNestedAssignObj$1 = b();
tmpNestedAssignComMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignComMemberProp$1 = $$('b');
tmpNestedAssignCompMemberObj$1 = tmpNestedAssignComMemberObj$1;
tmpNestedAssignCompMemberProp$1 = tmpNestedAssignComMemberProp$1;
tmpNestedAssignObj$2 = c();
tmpNestedAssignComMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignComMemberProp$2 = $$('c');
tmpNestedAssignCompMemberObj$2 = tmpNestedAssignComMemberObj$2;
tmpNestedAssignCompMemberProp$2 = tmpNestedAssignComMemberProp$2;
tmpNestedAssignObj$3 = d();
tmpNestedAssignComMemberObj$3 = tmpNestedAssignObj$3;
tmpNestedAssignComMemberProp$3 = $$('d');
tmpNestedPropAssignRhs = e;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs;
tmpNestedAssignCompMemberRhs$2 = tmpNestedPropAssignRhs;
tmpNestedAssignCompMemberObj$2[tmpNestedAssignCompMemberProp$2] = tmpNestedAssignCompMemberRhs$2;
tmpNestedAssignCompMemberRhs$1 = tmpNestedAssignCompMemberRhs$2;
tmpNestedAssignCompMemberObj$1[tmpNestedAssignCompMemberProp$1] = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberRhs = tmpNestedAssignCompMemberRhs$1;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpArg$1 = tmpNestedAssignCompMemberRhs;
$$(tmpArg$1);
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

Normalized calls: Same

Final output calls: Same
