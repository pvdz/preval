# Preval test case

# bug_minimal_try_catch_conditional.md

> Const aliasing > Bug minimal try catch conditional
>
> Try/catch: conditional mutation in catch block after aliasing

## Input

`````js filename=intro
let x = $("val");
const a = x;
try {
  throw 1;
} catch (e) {
  if (e === 1) {
    x = "changed";
  }
}
$(a, x);
// Expectation: a === "val", x === "changed". Aliasing is not safe.
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
let e = 1;
const tmpIfTest = e === 1;
if (tmpIfTest) {
  x = `changed`;
  $(a, x);
} else {
  $(a, x);
}
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
