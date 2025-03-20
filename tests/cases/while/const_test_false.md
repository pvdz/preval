# Preval test case

# const_test_false.md

> While > Const test false
>
> A test that is a constant only needs to be tested once

## Input

`````js filename=intro
const x = $(false);
while (x) {
  $('body');
}
$('after');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`body`);
  }
} else {
  $(`after`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  while (true) {
    $(`body`);
  }
} else {
  $(`after`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( false );
if (a) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( "body" );
  }
}
else {
  $( "after" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
