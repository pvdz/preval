# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...[$(1), 2, $(3)] });
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...[$(1), 2, $(3)] });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpObjSpreadArg = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
({ ...tmpObjSpreadArg });
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpObjSpreadArg = [tmpArrElement, 2, tmpArrElement$3];
({ ...tmpObjSpreadArg });
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 3 );
const d = [ b, 2, c,, ];
{ ... d };
$( a );
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
