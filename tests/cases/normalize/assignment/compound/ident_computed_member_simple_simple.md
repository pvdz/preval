# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > stmt > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= b[$('x')] += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
{
  tmpAssignComputedObj = tmpNestedAssignComMemberObj;
  tmpAssignComputedProp = tmpNestedAssignComMemberProp;
  tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
  tmpAssignComputedRhs = tmpBinaryLeft + c;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpAssignComputedObj = tmpNestedAssignComMemberObj;
tmpAssignComputedProp = tmpNestedAssignComMemberProp;
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpAssignComputedRhs = tmpBinaryLeft + 3;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
a = a * 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 5,{"x":5},3
 - 2: undefined

Normalized calls: BAD?!
[['x'], [3, { x: 5 }, 3], null];

Final output calls: BAD!!
[['x'], [3, { x: 5 }, 3], null];

