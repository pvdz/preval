# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = ~arg) });
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: -2 };
$(tmpCalleeParam);
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: -2 });
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: -2 };
$( a );
$( -2, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
const tmpObjLitVal = a;
let tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '-2' }
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
