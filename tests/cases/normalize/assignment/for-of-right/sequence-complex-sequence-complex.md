# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > for-of-right > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
for (let x of ((a, $(b)).c = (a, $(b)).c = d));
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
    a;
    let tmpBindInitMemberObject = $(b);
    {
      a;
      tmpAssignMemLhsObj = $(b);
      tmpAssignMemLhsObj.c = d;
    }
    let tmpBindInitRhs = d;
    tmpBindInitMemberObject.c = tmpBindInitRhs;
    const tmpForOfRhs = tmpBindInitRhs;
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
let tmpBindInitMemberObject = $(b);
tmpAssignMemLhsObj = $(b);
tmpAssignMemLhsObj.c = 3;
tmpBindInitMemberObject.c = 3;
for (tmpForOfLhsDecl of 3) {
}
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: {"c":3}
 - 1: {"c":3}
 - 2: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
