# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ [(a = b--)]: 10 });
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [1]: 10 };
$(tmpCalleeParam);
$(1, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [1]: 10 });
$(1, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ [(a = b--)]: 10 });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = tmpPostUpdArgIdent;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ 1 ]: 10 };
$( a );
$( 1, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { 1: '10' }
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
