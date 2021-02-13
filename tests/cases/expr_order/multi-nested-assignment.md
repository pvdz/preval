# Preval test case

# multi-nested-assignment.md

> expr_order > multi-nested-assignment
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

#TODO

## Input

`````js filename=intro
var a = function(){ $('a'); return 1; }
var b = function(){ $('b'); a = 21; return 2; }
var c = function(){ $('c'); a = 31; b = 32; return 3; }
var d = function(){ $('d'); a = 41; b = 42; c = 43; return 4; }
var e = function(){ $('e'); a = 51; b = 52; c = 53; d = 54; return 5; }
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
a = function () {
  $('a');
  return 1;
};
b = function () {
  $('b');
  a = 21;
  return 2;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
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
var a;
var b;
var c;
var d;
var e;
a = function () {
  $('a');
  return 1;
};
b = function () {
  $('b');
  a = 21;
  return 2;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
};
const tmpAssignMemLhsObj = a();
const varInitAssignLhsComputedObj = b();
const varInitAssignLhsComputedObj$1 = c();
const varInitAssignLhsComputedObj$2 = d();
const varInitAssignLhsComputedRhs$2 = e();
varInitAssignLhsComputedObj$2.x = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj$1.x = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs$2;
tmpAssignMemLhsObj.x = varInitAssignLhsComputedRhs$2;
$(a, b, c, d, e);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 51, 52, 53, 54, 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
