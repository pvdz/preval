# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_delete_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for ((a = delete arg.y).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = delete arg.y;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = delete arg.y;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
