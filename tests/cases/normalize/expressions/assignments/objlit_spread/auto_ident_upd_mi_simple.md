# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = --b) });
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
$(0, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(0, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = --b) });
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = b;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
$( 0, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
