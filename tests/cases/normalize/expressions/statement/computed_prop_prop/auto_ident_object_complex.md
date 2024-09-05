# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[{ x: $(1), y: 2, z: $(3) }];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[{ x: $(1), y: 2, z: $(3) }];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
const tmpCompProp = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
tmpCompObj[tmpCompProp];
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const obj = {};
const tmpCompProp = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
obj[tmpCompProp];
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {};
const d = {
  x: a,
  y: 2,
  z: b,
};
c[ d ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
