# Preval test case

# auto_ident_upd_ip_complex.md

> normalize > expressions > assignments > for_of_left > auto_ident_upd_ip_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for ((a = $($(b)).x++).x of $({ x: 1 }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(b);
    const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj;
    const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
    tmpAssignMemLhsObj$1.x = tmpAssignMemRhs;
    a = tmpPostUpdArgVal;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpCalleeParam$1 = $(b);
    const tmpPostUpdArgObj = $(tmpCalleeParam$1);
    const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
    const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
    tmpPostUpdArgObj.x = tmpAssignMemRhs;
    a = tmpPostUpdArgVal;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
