# Preval test case

# const_new_arg.md

> Unroll loop with true > Const new arg
>
>

## Input

`````js filename=intro
const x = new String($LOOP_NO_UNROLLS_LEFT);
$(x);
`````


## Settled


`````js filename=intro
const x /*:object*/ /*truthy*/ = new $string_constructor(true);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $string_constructor(true));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $string_constructor( true );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $string_constructor(true);
$(x);
`````


## Todos triggered


- (todo) this implies a bug and we should prevent it; j


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
