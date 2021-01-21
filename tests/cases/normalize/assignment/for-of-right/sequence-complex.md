# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let x of ((a, $(b)).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
{
  let tmpForOfLhsDecl;
  {
    {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemLhsObj.c = d;
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
let b = { c: 2 };
let tmpForOfLhsDecl;
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj.c = 3;
for (tmpForOfLhsDecl of 3) {
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
