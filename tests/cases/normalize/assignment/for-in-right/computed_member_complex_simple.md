# Preval test case

# computed_member_complex_simple.md

> normalize > assignment > for-in-right > computed_member_complex_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
for (let x in ($(a)[$('x')] = b));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let b = 2;
let c = 3;
{
  let tmpForInLhsDecl;
  {
    tmpAssignMemLhsObj = $(a);
    tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
    tmpAssignComMemLhsProp = $('x');
    tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = b;
    const tmpForInRhs = b;
    for (tmpForInLhsDecl in tmpForInRhs) {
      let x = tmpForInLhsDecl;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
let a = { x: 10 };
let tmpForInLhsDecl;
tmpAssignMemLhsObj = $(a);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 2;
for (tmpForInLhsDecl in 2) {
}
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: {"x":2}
 - 1: "x"
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
