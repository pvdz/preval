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

## Normalized

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
let obj = {
  get c() {
    $('get');
  },
  set c(x) {
    $('set');
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
const varInitAssignLhsComputedObj$2 = d();
const varInitAssignLhsComputedRhs$2 = e();
varInitAssignLhsComputedObj$2.x = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
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
    $('get');
  },
  set c(x) {
    $('set');
  },
};
let SSA_a = function () {
  $('a');
  return obj;
};
let SSA_b = function () {
  $('b');
  SSA_a = 21;
  return obj;
};
let SSA_c = function () {
  $('c');
  SSA_a = 31;
  SSA_b = 32;
  return obj;
};
let SSA_d = function () {
  $('d');
  SSA_a = 41;
  SSA_b = 42;
  SSA_c = 43;
  return obj;
};
const e = function () {
  $('e');
  SSA_a = 51;
  SSA_b = 52;
  SSA_c = 53;
  SSA_d = 54;
  return obj;
};
const tmpAssignMemLhsObj = SSA_a();
const varInitAssignLhsComputedObj = SSA_b();
const varInitAssignLhsComputedObj$1 = SSA_c();
const varInitAssignLhsComputedObj$2 = SSA_d();
const varInitAssignLhsComputedRhs$2 = e();
varInitAssignLhsComputedObj$2.x = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$2;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$2;
$(SSA_a, SSA_b, SSA_c, SSA_d, e);
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

Normalized calls: Same

Final output calls: Same
