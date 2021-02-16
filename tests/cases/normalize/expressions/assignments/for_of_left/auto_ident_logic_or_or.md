# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > assignments > for_of_left > auto_ident_logic_or_or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || $($(1)) || $($(2))).x of $({ x: 1 }));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
{
  let tmpForOfLhsNode;
  for (tmpForOfLhsNode of tmpForOfRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(0);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    if (a) {
    } else {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(1);
      a = tmpCallCallee$2(tmpCalleeParam$2);
    }
    if (a) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      a = tmpCallCallee$3(tmpCalleeParam$3);
    }
    let tmpAssignMemLhsObj = a;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpCalleeParam$1 = $(0);
  a = $(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCalleeParam$2 = $(1);
    a = $(tmpCalleeParam$2);
  }
  if (a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    a = $(tmpCalleeParam$3);
  }
  let tmpAssignMemLhsObj = a;
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

Normalized calls: Same

Final output calls: Same
