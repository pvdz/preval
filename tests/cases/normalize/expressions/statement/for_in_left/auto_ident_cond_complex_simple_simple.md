# Preval test case

# auto_ident_cond_complex_simple_simple.md

> normalize > expressions > statement > for_in_left > auto_ident_cond_complex_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($(1) ? 2 : $($(100))).x in $({ x: 1 }));
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
    let tmpAssignMemLhsObj = undefined;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      tmpAssignMemLhsObj = 2;
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(100);
      tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
    }
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
{
  let tmpForInLhsNode;
  for (tmpForInLhsNode in tmpForInRhs) {
    let tmpAssignMemLhsObj = undefined;
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      tmpAssignMemLhsObj = 2;
    } else {
      const tmpCalleeParam$1 = $(100);
      tmpAssignMemLhsObj = $(tmpCalleeParam$1);
    }
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same