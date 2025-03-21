# Preval test case

# const_new_arg.md

> Unroll loop with true > Const new arg
>
>

## Input

`````js filename=intro
const x = new String($LOOP_DONE_UNROLLING_ALWAYS_TRUE);
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ = new String(true);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new String(true));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new String( true );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"t"', 1: '"r"', 2: '"u"', 3: '"e"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
