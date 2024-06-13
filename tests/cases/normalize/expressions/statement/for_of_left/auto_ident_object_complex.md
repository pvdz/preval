# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > For of left > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ({ x: $(1), y: 2, z: $(3) }.x of $({ x: 1 }));
$(a);
`````

## Pre Normal


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
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = 2;
  const tmpObjLitVal$3 = $(3);
  const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = { x: 1 };
const tmpForOfRhs = $(tmpCalleeParam);
let tmpForOfLhsNode = undefined;
for (tmpForOfLhsNode of tmpForOfRhs) {
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$3 = $(3);
  const tmpAssignMemLhsObj = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
  tmpAssignMemLhsObj.x = tmpForOfLhsNode;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 1 };
const c = $( b );
let d = undefined;
for (d of c) {
  const e = $( 1 );
  const f = $( 3 );
  const g = {
    x: e,
    y: 2,
    z: f,
  };
  g.x = d;
}
$( a );
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
