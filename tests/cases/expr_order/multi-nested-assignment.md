# Preval test case

# multi-nested-assignment.md

> Expr order > Multi-nested-assignment
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

#TODO

## Input

`````js filename=intro
let obj = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};
var a = function(){ $('a'); return obj; }
var b = function(){ $('b'); a = 21; return obj; }
var c = function(){ $('c'); a = 31; b = 32; return obj; }
var d = function(){ $('d'); a = 41; b = 42; c = 43; return obj; }
var e = function(){ $('e'); a = 51; b = 52; c = 53; d = 54; return obj; }
a().x = b().x = c().x = d().x = e()
$(a, b, c, d, e);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let obj = {
  get c() {
    debugger;
    $('get');
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $('set');
  },
};
a = function () {
  debugger;
  $('a');
  return obj;
};
b = function () {
  debugger;
  $('b');
  a = 21;
  return obj;
};
c = function () {
  debugger;
  $('c');
  a = 31;
  b = 32;
  return obj;
};
d = function () {
  debugger;
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
e = function () {
  debugger;
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
a().x = b().x = c().x = d().x = e();
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let obj = {
  get c() {
    debugger;
    $('get');
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $('set');
    return undefined;
  },
};
a = function () {
  debugger;
  $('a');
  return obj;
};
b = function () {
  debugger;
  $('b');
  a = 21;
  return obj;
};
c = function () {
  debugger;
  $('c');
  a = 31;
  b = 32;
  return obj;
};
d = function () {
  debugger;
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
e = function () {
  debugger;
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
const tmpAssignMemLhsObj = a();
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const varInitAssignLhsComputedObj = b();
const varInitAssignLhsComputedObj$1 = c();
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedRhs$3 = e();
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
const tmpAssignMemRhs = varInitAssignLhsComputedRhs;
tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
const obj = {
  get c() {
    debugger;
    $('get');
    return undefined;
  },
  set c($$0) {
    debugger;
    $('set');
    return undefined;
  },
};
let tmpSSA_a = function () {
  debugger;
  $('a');
  return obj;
};
let tmpSSA_b = function () {
  debugger;
  $('b');
  tmpSSA_a = 21;
  return obj;
};
let tmpSSA_c = function () {
  debugger;
  $('c');
  tmpSSA_a = 31;
  tmpSSA_b = 32;
  return obj;
};
let tmpSSA_d = function () {
  debugger;
  $('d');
  tmpSSA_a = 41;
  tmpSSA_b = 42;
  tmpSSA_c = 43;
  return obj;
};
const tmpSSA_e = function () {
  debugger;
  $('e');
  tmpSSA_a = 51;
  tmpSSA_b = 52;
  tmpSSA_c = 53;
  tmpSSA_d = 54;
  return obj;
};
const tmpAssignMemLhsObj = tmpSSA_a();
const varInitAssignLhsComputedObj = tmpSSA_b();
const varInitAssignLhsComputedObj$1 = tmpSSA_c();
const varInitAssignLhsComputedObj$3 = tmpSSA_d();
const varInitAssignLhsComputedRhs$3 = tmpSSA_e();
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$3;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$3;
$(tmpSSA_a, tmpSSA_b, tmpSSA_c, tmpSSA_d, tmpSSA_e);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 51, 52, 53, 54, '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
