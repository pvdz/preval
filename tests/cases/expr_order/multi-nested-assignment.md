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
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
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
tmpAssignMemLhsObj = a();
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = c();
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignObj$2 = d();
tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignMemberRhs$2 = e();
tmpNestedAssignMemberObj$2.x = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberRhs$1 = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemLhsObj$2;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberObj$1;
var tmpNestedAssignMemberObj$2;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberRhs$1;
var tmpNestedAssignMemberRhs$2;
var tmpNestedAssignObj;
var tmpNestedAssignObj$1;
var tmpNestedAssignObj$2;
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
tmpAssignMemLhsObj = a();
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj$1 = c();
tmpNestedAssignMemberObj$1 = tmpNestedAssignObj$1;
tmpNestedAssignObj$2 = d();
tmpNestedAssignMemberObj$2 = tmpNestedAssignObj$2;
tmpNestedAssignMemberRhs$2 = e();
tmpNestedAssignMemberObj$2.x = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberRhs$1 = tmpNestedAssignMemberRhs$2;
tmpNestedAssignMemberObj$1.x = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs$1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "b"
 - 2: "c"
 - 3: "d"
 - 4: "e"
 - 5: 51,52,53,54,null
 - 6: undefined

Normalized calls: Same

Final output calls: Same
