# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ x: (a = typeof arg) });
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `number` };
$(tmpCalleeParam);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ x: `number` });
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: "number" };
$( a );
$( "number", 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '"number"' }
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
