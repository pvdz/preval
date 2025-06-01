# Preval test case

# bug_minimal_if_else_one.md

> Const aliasing > Bug minimal if else one
>
> If/else: only one branch mutates x after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
if (true) {
  x = "changed";
  $(a, x);
} else {
  $(a, x);
}
// Expectation: In the true branch, a === "val", x === "changed". In the false branch, a === x === "val".
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
x = `changed`;
$(a, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
