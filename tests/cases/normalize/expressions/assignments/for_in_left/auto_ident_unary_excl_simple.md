# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > assignments > for_in_left > auto_ident_unary_excl_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for ((a = !arg).x in $({ x: 1 }));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = !arg;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    a = !arg;
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: false, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same