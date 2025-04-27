# Preval test case

# recursive3.md

> Assign hoisting > Recursive3
>
> Note: this won't hoist because the recursive read means the write is not the second ref

## Input

`````js filename=intro
let x = 1;
const cheeky = $('oops?');
x = x + 1; // assign hoisting should not make this the decl because that would introduce a tdz
$(x, cheeky);
`````


## Settled


`````js filename=intro
const cheeky /*:unknown*/ = $(`oops?`);
$(2, cheeky);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2, $(`oops?`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "oops?" );
$( 2, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oops?'
 - 2: 2, 'oops?'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
