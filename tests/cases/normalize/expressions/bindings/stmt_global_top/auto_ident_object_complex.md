# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident object complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { x: $(1), y: 2, z: $(3) };
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = 2;
const tmpObjLitVal$3 = $(3);
let a = { x: tmpObjLitVal, y: tmpObjLitVal$1, z: tmpObjLitVal$3 };
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpObjLitVal$3 = $(3);
const a = { x: tmpObjLitVal, y: 2, z: tmpObjLitVal$3 };
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
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
