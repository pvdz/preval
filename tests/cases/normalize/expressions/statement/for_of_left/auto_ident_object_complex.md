# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > for_of_left > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ({ x: $(1), y: 2, z: $(3) }.x of $({ x: 1 }));
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
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$2 = $(3);
    const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
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
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$2 = $(3);
  const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
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
