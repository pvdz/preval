# Preval test case

# ident_member_complex_simple.md

> normalize > assignment > stmt > ident_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= $(b).x += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignObj = $(b);
{
  tmpAssignMemLhsObj = tmpNestedAssignObj;
  tmpBinaryLeft = tmpNestedAssignObj.x;
  tmpAssignMemRhs = tmpBinaryLeft + c;
  tmpAssignMemLhsObj.x = tmpAssignMemRhs;
}
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignObj;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignObj = $(b);
tmpAssignMemLhsObj = tmpNestedAssignObj;
tmpBinaryLeft = tmpNestedAssignObj.x;
tmpAssignMemRhs = tmpBinaryLeft + 3;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = a * 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":5}
 - 1: 5,{"x":5},3
 - 2: undefined

Normalized calls: BAD?!
[[{ x: 5 }], [3, { x: 5 }, 3], null];

Final output calls: BAD!!
[[{ x: 5 }], [3, { x: 5 }, 3], null];

