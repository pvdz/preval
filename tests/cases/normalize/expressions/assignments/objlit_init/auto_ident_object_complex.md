# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident object complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: $(1), y: 2, z: $(3) }) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: $(1), y: 2, z: $(3) }) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$3 = 2;
const tmpObjLitVal$5 = $(3);
a = { x: tmpObjLitVal$1, y: tmpObjLitVal$3, z: tmpObjLitVal$5 };
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = $(1);
const tmpObjLitVal$5 = $(3);
const a = { x: tmpObjLitVal$1, y: 2, z: tmpObjLitVal$5 };
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = {
x: a,
y: 2,
z: b
;
const d = { x: c };
$( d );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '{"x":"1","y":"2","z":"3"}' }
 - 4: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
