# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Binary both > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: 1, y: 2, z: 3 } + { x: 1, y: 2, z: 3 });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
({ x: 1, y: 2, z: 3 } + { x: 1, y: 2, z: 3 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpBinBothRhs /*:object*/ = { x: 1, y: 2, z: 3 };
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = {
  x: 1,
  y: 2,
  z: 3,
};
a + b;
const c = {
  a: 999,
  b: 1000,
};
$( c );
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
