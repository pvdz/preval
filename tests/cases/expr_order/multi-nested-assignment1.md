# Preval test case

# multi-nested-assignment1.md

> Expr order > Multi-nested-assignment1
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

Making sure the closure outlining does not screw up with setters

#TODO

## Input

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let obj = {
  get c() {
    $('get');
    return undefined;
  },
  set c(x) {
    obj = 'boom'
    $('set');
    return undefined;
  },
};
a = function () {
  $('a');
  return obj;
};
b = function () {
  $('b');
  a = 21;
  return obj;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return obj;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
e = function () {
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
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    obj = 'boom';
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
    obj = 'boom';
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
let obj = {
  get c() {
    debugger;
    $('get');
    return undefined;
  },
  set c($$0) {
    debugger;
    obj = 'boom';
    $('set');
    return undefined;
  },
};
let a = function () {
  debugger;
  $('a');
  return obj;
};
let b = function () {
  debugger;
  $('b');
  a = 21;
  return obj;
};
let c = function () {
  debugger;
  $('c');
  a = 31;
  b = 32;
  return obj;
};
let d = function () {
  debugger;
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return obj;
};
const e = function () {
  debugger;
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obj;
};
const tmpAssignMemLhsObj = a();
const varInitAssignLhsComputedObj = b();
const varInitAssignLhsComputedObj$1 = c();
const varInitAssignLhsComputedObj$3 = d();
e();
const varInitAssignLhsComputedRhs$3 = obj;
varInitAssignLhsComputedObj$3.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$3;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$3;
$(a, b, c, d, e);
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
