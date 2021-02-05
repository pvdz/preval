# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > assignments > for_of_left > auto_ident_logic_or_and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ((a = $($(0)) || ($($(1)) && $($(2)))).x of $({ x: 1 }));
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
    let tmpAssignMemLhsObj;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(0);
    let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(1);
      tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
      if (tmpNestedComplexRhs) {
        const tmpCallCallee$3 = $;
        const tmpCalleeParam$3 = $(2);
        tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
      }
    }
    a = tmpNestedComplexRhs;
    tmpAssignMemLhsObj = tmpNestedComplexRhs;
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = tmpCallCallee(tmpCalleeParam);
let tmpForOfLhsNode;
for (tmpForOfLhsNode of tmpForOfRhs) {
  let tmpAssignMemLhsObj;
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(1);
    tmpNestedComplexRhs = tmpCallCallee$2(tmpCalleeParam$2);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$3);
    }
  }
  a = tmpNestedComplexRhs;
  tmpAssignMemLhsObj = tmpNestedComplexRhs;
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
