# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ [(a = ~arg)]: 10 });
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [-2]: 10 };
$(tmpCalleeParam);
$(-2, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [-2]: 10 });
$(-2, 1);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ [(a = ~arg)]: 10 });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { [ -2 ]: 10 };
$( a );
$( -2, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { '-2': '10' }
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
