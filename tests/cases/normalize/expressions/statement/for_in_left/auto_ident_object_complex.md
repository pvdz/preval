# Preval test case

# auto_ident_object_complex.md

> normalize > expressions > statement > for_in_left > auto_ident_object_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ({ x: $(1), y: 2, z: $(3) }.x in $({ x: 1 }));
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
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$1 = 2;
    const tmpObjLitVal$2 = $(3);
    const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$2 };
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
    const tmpObjLitVal = $(1);
    const tmpObjLitVal$2 = $(3);
    const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$2 };
    tmpAssignMemLhsObj.x = tmpForInLhsNode;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same