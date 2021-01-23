# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

Single nested compound computed prop assignment with all parts complex

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
$(a, 'a()')[$('x', 'a')] = $(b, 'b()')[$('x', 'b')] += $(c, 'c()')[$('x', 'c')];


$('final:', a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpComputedObj;
var tmpComputedProp;
var tmpMemberComplexObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
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
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x', 'a');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpNestedAssignObj = $(b, 'b()');
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x', 'b');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpMemberComplexObj = $(c, 'c()');
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $('x', 'c');
tmpBinaryRight = tmpComputedObj[tmpComputedProp];
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
tmpAssignComputedRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$('final:', a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj$1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpComputedObj;
var tmpComputedProp;
var tmpMemberComplexObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
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
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x', 'a');
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpNestedAssignObj = $(b, 'b()');
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x', 'b');
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpMemberComplexObj = $(c, 'c()');
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $('x', 'c');
tmpBinaryRight = tmpComputedObj[tmpComputedProp];
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
tmpAssignComputedRhs = tmpNestedPropCompoundComplexRhs;
tmpAssignMemLhsObj$1 = tmpAssignComputedObj;
tmpAssignMemLhsObj$1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$('final:', a, b, c);
`````

## Result

Should call `$` with:
 - 0: {"x":3},"a()"
 - 1: "x","a"
 - 2: {"x":7},"b()"
 - 3: "x","b"
 - 4: "b.x.get"
 - 5: {"x":11},"c()"
 - 6: "x","c"
 - 7: "c.x.get"
 - 8: "b.x.get",18
 - 9: "a.x.get",18
 - 10: "final:",{"x":3},{"x":7},{"x":11}
 - 11: undefined

Normalized calls: Same

Final output calls: Same
