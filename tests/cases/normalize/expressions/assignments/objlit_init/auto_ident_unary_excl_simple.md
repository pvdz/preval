# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = !arg) });
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ x: (a = !arg) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = !arg;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: false };
$(tmpCalleeParam);
$(false, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: false };
$( a );
$( false, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: 'false' }
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
