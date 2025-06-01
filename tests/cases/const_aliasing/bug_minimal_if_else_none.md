# Preval test case

# bug_minimal_if_else_none.md

> Const aliasing > Bug minimal if else none
>
> If/else: neither branch mutates x after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
if (true) {
  $(a, x);
} else {
  $(a, x);
}
// Expectation: In both branches, a === x === "val". Aliasing is safe.
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(x, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
$(x, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
