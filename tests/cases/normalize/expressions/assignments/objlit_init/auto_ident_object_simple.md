# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: 1, y: 2, z: 3 }) });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = { x: 1, y: 2, z: 3 }) });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = { x: 1, y: 2, z: 3 };
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = { x: 1, y: 2, z: 3 };
const tmpCalleeParam = { x: a };
$(tmpCalleeParam);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
x: 1,
y: 2,
z: 3
;
const b = { x: a };
$( b );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '{"x":"1","y":"2","z":"3"}' }
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
