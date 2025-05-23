# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ [(a = typeof x)]: 10 });
$(a, x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { number: 10 };
$(tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ number: 10 });
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { number: 10 };
$( a );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { number: '10' }
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
