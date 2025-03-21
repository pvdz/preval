# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = void arg) });
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
$(tmpCalleeParam);
$(undefined, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
$(undefined, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = void arg) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
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
$( undefined, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
