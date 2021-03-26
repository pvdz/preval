# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > For of left > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((($($(1)) && $($(1))) || $($(2))).x of $({ x: 1 }));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((($($(1)) && $($(1))) || $($(2))).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    tmpAssignMemLhsObj = tmpCallCallee$3(tmpCalleeParam$3);
  }
  if (tmpAssignMemLhsObj) {
  } else {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    tmpAssignMemLhsObj = tmpCallCallee$5(tmpCalleeParam$5);
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = $(1);
  let tmpAssignMemLhsObj = $(tmpCalleeParam$1);
  if (tmpAssignMemLhsObj) {
    const tmpCalleeParam$3 = $(1);
    tmpAssignMemLhsObj = $(tmpCalleeParam$3);
  }
  if (tmpAssignMemLhsObj) {
  } else {
    const tmpCalleeParam$5 = $(2);
    tmpAssignMemLhsObj = $(tmpCalleeParam$5);
  }
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
