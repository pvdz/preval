# Preval test case

# nested.md

> Tail breaking > Nested
>
> A problem case with a nested label and a statement after the `if` that disappears

## Input

`````js filename=intro
outer: {
  inner: {
    const b = $(3);
    if (b) {
      break outer;
    } else {
      break inner;
    }
  }
  $(`the_problem`);
}
`````


## Settled


`````js filename=intro
const b /*:unknown*/ = $(3);
if (b) {
} else {
  $(`the_problem`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(3)) {
  $(`the_problem`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
if (a) {

}
else {
  $( "the_problem" );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
