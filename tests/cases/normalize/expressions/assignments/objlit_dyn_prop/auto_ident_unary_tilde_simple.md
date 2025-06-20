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
const tmpCalleeParam /*:object*/ /*truthy*/ = { [-2]: 10 };
$(tmpCalleeParam);
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [-2]: 10 });
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ -2 ]: 10 };
$( a );
$( -2, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


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
