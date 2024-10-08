# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident object simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...{ x: 1, y: 2, z: 3 }];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...{ x: 1, y: 2, z: 3 }];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElToSpread = { x: 1, y: 2, z: 3 };
[...tmpArrElToSpread];
$(a);
`````

## Output


`````js filename=intro
const tmpArrElToSpread /*:object*/ = { x: 1, y: 2, z: 3 };
[...tmpArrElToSpread];
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
[ ...a ];
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
