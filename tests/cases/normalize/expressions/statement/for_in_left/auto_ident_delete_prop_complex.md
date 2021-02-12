# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > for_in_left > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
for ((delete $(x).y).x in $({ x: 1 }));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpDeleteObj = $(x);
    const tmpAssignMemLhsObj = delete tmpDeleteObj.y;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpDeleteObj = $(x);
    const tmpAssignMemLhsObj = delete tmpDeleteObj.y;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { y: '1' }
 - 3: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
