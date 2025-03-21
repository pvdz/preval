# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ [(a = !arg)]: 10 });
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [false]: 10 };
$(tmpCalleeParam);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [false]: 10 });
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ false ]: 10 };
$( a );
$( false, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { false: '10' }
 - 2: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
