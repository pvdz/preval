# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = -arg) });
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ x: (a = -arg) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = -arg;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: -1 };
$(tmpCalleeParam);
$(-1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: -1 };
$( a );
$( -1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '-1' }
 - 2: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
