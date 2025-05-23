# Preval test case

# var_read_write_read.md

> Assigns > Var read write read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
$(x, 'a'); // This read should be inlined by `undefined`
x = $(2); // After inlining the above, this should become a constant anyways
$(x, 'b');
`````


## Settled


`````js filename=intro
$(1);
$(undefined, `a`);
const x /*:unknown*/ = $(2);
$(x, `b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(undefined, `a`);
$($(2), `b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( undefined, "a" );
const a = $( 2 );
$( a, "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
$(1);
$(x, `a`);
x = $(2);
$(x, `b`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: undefined, 'a'
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
