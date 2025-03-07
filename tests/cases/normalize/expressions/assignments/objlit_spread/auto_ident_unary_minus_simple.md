# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = -arg) });
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
$(-1, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(-1, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = -arg) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = -arg;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
$( -1, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
