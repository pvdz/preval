# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > for-of-right > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x of ($(a)[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForOfLhsDecl;
  {
    tmpAssignMemLhsObj = $(a);
    tmpAssignMemRhs = b;
    tmpAssignedComputedObj = tmpAssignMemLhsObj;
    tmpAssignedComputedProp = $('x');
    tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
    const tmpForOfRhs = b;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpAssignedComputedObj;
var tmpAssignedComputedProp;
let a = { x: 10 };
let tmpForOfLhsDecl;
tmpAssignMemLhsObj = $(a);
tmpAssignMemRhs = 2;
tmpAssignedComputedObj = tmpAssignMemLhsObj;
tmpAssignedComputedProp = $('x');
tmpAssignedComputedObj[tmpAssignedComputedProp] = tmpAssignMemRhs;
for (tmpForOfLhsDecl of 2) {
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
[[{ x: 10 }], ['x'], "<crash[ Cannot set property 'undefined' of undefined ]>"];

Normalized calls: Same

Final output calls: Same
