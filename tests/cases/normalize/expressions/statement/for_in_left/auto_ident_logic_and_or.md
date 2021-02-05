# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > statement > for_in_left > auto_ident_logic_and_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((($($(1)) && $($(1))) || $($(2))).x in $({ x: 1 }));
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
    const tmpCalleeParam$1 = $(1);
    let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpAssignMemLhsObj) {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(1);
      tmpAssignMemLhsObj = tmpCallCallee$2(tmpCalleeParam$2);
    }
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
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
  const tmpCalleeParam$1 = $(1);
  let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(1);
    tmpAssignMemLhsObj = tmpCallCallee$2(tmpCalleeParam$2);
  }
  if (tmpAssignMemLhsObj) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
