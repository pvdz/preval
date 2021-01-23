# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

Single nested regular prop assignment with all parts complex

#TODO

## Input

`````js filename=intro
let 
    a = {
      get x() { $('a.x.get'); return 3; },
      set x(z) { $('a.x.get', z); },
    }, 
    b = {
      get x() { $('b.x.get'); return 7; },
      set x(z) { $('b.x.get', z); },
    },
    c = {
      get x() { $('c.x.get'); return 11; },
      set x(z) { $('c.x.get', z); },
    } 
$(a, 'a()').x = $(b, 'b()').x += $(c, 'c()').x;


$('final:', a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpMemberComplexObj;
let a = {
  get x() {
    $('a.x.get');
    return 3;
  },
  set x(z) {
    $('a.x.get', z);
  },
};
let b = {
  get x() {
    $('b.x.get');
    return 7;
  },
  set x(z_1) {
    $('b.x.get', z_1);
  },
};
let c = {
  get x() {
    $('c.x.get');
    return 11;
  },
  set x(z_2) {
    $('c.x.get', z_2);
  },
};
tmpAssignMemLhsObj = $(a, 'a()');
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = $(b, 'b()');
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpMemberComplexObj = $(c, 'c()');
tmpBinaryRight = tmpMemberComplexObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$('final:', a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpMemberComplexObj;
let a = {
  get x() {
    $('a.x.get');
    return 3;
  },
  set x(z) {
    $('a.x.get', z);
  },
};
let b = {
  get x() {
    $('b.x.get');
    return 7;
  },
  set x(z_1) {
    $('b.x.get', z_1);
  },
};
let c = {
  get x() {
    $('c.x.get');
    return 11;
  },
  set x(z_2) {
    $('c.x.get', z_2);
  },
};
tmpAssignMemLhsObj = $(a, 'a()');
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = $(b, 'b()');
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpMemberComplexObj = $(c, 'c()');
tmpBinaryRight = tmpMemberComplexObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$('final:', a, b, c);
`````

## Result

Should call `$` with:
 - 0: {"x":3},"a()"
 - 1: {"x":7},"b()"
 - 2: "b.x.get"
 - 3: {"x":11},"c()"
 - 4: "c.x.get"
 - 5: "b.x.get",18
 - 6: "a.x.get",18
 - 7: "final:",{"x":3},{"x":7},{"x":11}
 - 8: undefined

Normalized calls: Same

Final output calls: Same
