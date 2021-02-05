# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > statement > for_in_left > auto_ident_logic_or_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || 2).x in $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(0);
    let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpAssignMemLhsObj) {
    } else {
      tmpAssignMemLhsObj = 2;
    }
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = tmpCallCallee(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(0);
  let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
  } else {
    tmpAssignMemLhsObj = 2;
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
