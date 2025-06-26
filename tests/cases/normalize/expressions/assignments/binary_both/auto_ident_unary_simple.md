# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof x) + (a = typeof x));
$(a, x);
`````


## Settled


`````js filename=intro
$(`numbernumber`);
$(`number`, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`numbernumber`);
$(`number`, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "numbernumber" );
$( "number", 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x;
const tmpBinBothLhs = a;
a = typeof x;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x);
`````


## Todos triggered


- (todo) We should be able to resolve the $frfr call but pcode failed to complete with a Node, hasExplicitGlobal=false
- (todo) find test case where template ends up with multiple expressions
- (todo) free with zero args, we can eliminate this?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'numbernumber'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
