# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{ x: 1, y: 2, z: 3 } });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...{ x: 1, y: 2, z: 3 } });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = { x: 1, y: 2, z: 3 };
({ ...tmpObjSpreadArg });
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpObjSpreadArg = { x: 1, y: 2, z: 3 };
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = {
  x: 1,
  y: 2,
  z: 3,
};
{ ... b };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
