# Preval test case

# auto_ident_logic_or_complex_complex.md

> normalize > expressions > statement > for_of_left > auto_ident_logic_or_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (($($(0)) || $($(2))).x of $({ x: 1 }));
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
    let tmpAssignMemLhsObj = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpAssignMemLhsObj) {
    } else {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpAssignMemLhsObj = tmpCallCallee$2(tmpCalleeParam$2);
    }
    tmpAssignMemLhsObj.x = tmpForOfLhsNode;
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
