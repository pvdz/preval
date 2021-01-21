# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
for (let x of ((a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let a = 1;
let b = { c: 2 };
let d = 3;
{
  let tmpForOfLhsDecl;
  {
    {
      a;
      {
        tmpAssignMemLhsObj = $(b);
        tmpAssignMemRhs = d;
        tmpAssignMemLhsObj.c = tmpAssignMemRhs;
      }
    }
    const tmpForOfRhs = d;
    for (tmpForOfLhsDecl of tmpForOfRhs) {
      let x = tmpForOfLhsDecl;
    }
  }
}
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
let b = { c: 2 };
let tmpForOfLhsDecl;
tmpAssignMemLhsObj = $(b);
tmpAssignMemRhs = 3;
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
for (tmpForOfLhsDecl of 3) {
}
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: {"c":2}
 - 1: <crash[ Cannot set property 'c' of undefined ]>

Normalized calls: Same

Final output calls: Same