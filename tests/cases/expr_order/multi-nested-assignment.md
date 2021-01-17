# Preval test case

# multi-nested-assignment.md

> expr_order > multi-nested-assignment
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

#TODO

## Input

`````js filename=intro
function $(...a) { console.log('$:', a); return a[0]; } 
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
function $_1(...a_1) {
  console.log('$:', a_1);
  {
    let tmpStmtArg = a_1[0];
    return tmpStmtArg;
  }
}
var a;
var b;
var c;
var d;
var e;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
a = function () {
  $_1('a');
  return 1;
};
b = function () {
  $_1('b');
  a = 21;
  return 2;
};
c = function () {
  $_1('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $_1('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $_1('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
};
tmpAssignMemLhsObj = a();
tmpNestedAssignMemberObj = b();
tmpNestedAssignMemberObj_1 = c();
tmpNestedAssignMemberObj_2 = d();
tmpNestedAssignMemberRhs_2 = e();
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$_1(a, b, c, d, e);
`````

## Output

`````js filename=intro
function $_1(...a_1) {
  console.log('$:', a_1);
  let tmpStmtArg = a_1[0];
  return tmpStmtArg;
}
var a;
var b;
var c;
var d;
var e;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
a = function () {
  $_1('a');
  return 1;
};
b = function () {
  $_1('b');
  a = 21;
  return 2;
};
c = function () {
  $_1('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $_1('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $_1('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
};
tmpAssignMemLhsObj = a();
tmpNestedAssignMemberObj = b();
tmpNestedAssignMemberObj_1 = c();
tmpNestedAssignMemberObj_2 = d();
tmpNestedAssignMemberRhs_2 = e();
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$_1(a, b, c, d, e);
`````
