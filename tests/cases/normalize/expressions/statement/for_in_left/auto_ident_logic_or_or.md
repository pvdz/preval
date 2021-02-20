# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > for_in_left > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || $($(1)) || $($(2))).x in $({ x: 1 }));
$(a);
`````

## Normalized

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

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForInRhs = $(tmpCalleeParam);
let tmpForInLhsNode;
for (tmpForInLhsNode in tmpForInRhs) {
  const tmpCalleeParam$1 = $(0);
  let tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
  } else {
    const tmpCalleeParam$2 = $(1);
    tmpAssignMemLhsObj = $(tmpCalleeParam$2);
  }
  if (tmpAssignMemLhsObj) {
  } else {
    const tmpCalleeParam$3 = $(2);
    tmpAssignMemLhsObj = $(tmpCalleeParam$3);
  }
  tmpAssignMemLhsObj.x = tmpForInLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - eval returned: ("<crash[ Cannot create property 'x' on number '1' ]>")

Normalized calls: Same

Final output calls: Same
