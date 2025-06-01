# Preval test case

# bug_minimal_if_else_both.md

> Const aliasing > Bug minimal if else both
>
> If/else: both branches mutate x after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
if (true) {
  x = "changed1";
  $(a, x);
} else {
  x = "changed2";
  $(a, x);
}
// Expectation: In both branches, a === "val", x === "changed1" or "changed2".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed1`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed1`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed1" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
x = `changed1`;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
