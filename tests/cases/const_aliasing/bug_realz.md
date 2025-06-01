# Preval test case

# bug_realz.md

> Const aliasing > Bug realz
>
> AI is certain now

## Input

`````js filename=intro
let x = $("val");
const a = x;
$continue: {
  const skip = true;
  if (skip) {
    break $continue;
  } else {
    x = "changed";
  }
}
$(a, x);
// Expectation: a === "val", x === "val" (since the mutation is skipped)
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
$continue: {
  const skip = true;
  if (skip) {
    break $continue;
  } else {
    x = `changed`;
  }
}
$(a, x);
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
