# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(...(a = typeof arg));
$(a, arg);
`````


## Settled


`````js filename=intro
$(...`number`);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...`number`);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ..."number" );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'n', 'u', 'm', 'b', 'e', 'r'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
