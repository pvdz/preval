# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ [(a = b++)]: 10 });
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ [(a = b++)]: 10 });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpPostUpdArgIdent = b;
b = b + 1;
a = tmpPostUpdArgIdent;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [1]: 10 };
$(tmpCalleeParam);
$(1, 2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 1 ]: 10 };
$( a );
$( 1, 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 1: '10' }
 - 2: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
