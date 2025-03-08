# Preval test case

# static_const_bool.md

> Tofix > static const bool
>
> A const that is only tested (treated as bool) and which we can
> proof not to change must have the same outcome when tested before

## Input

`````js filename=intro
const x = $(false);
if (x) {
  $(`body`);
  while ($LOOP_UNROLL_10) {
    if (x) { // We can safely determine this to be truthy
      $(`body`);
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(false);
if (x) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(`body`);
  }
} else {
}
$(`after`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(false)) {
  while (true) {
    $(`body`);
  }
}
$(`after`);
`````

## Pre Normal


`````js filename=intro
const x = $(false);
if (x) {
  $(`body`);
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(`body`);
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## Normalized


`````js filename=intro
const x = $(false);
if (x) {
  while ($LOOP_UNROLL_10) {
    $(`body`);
    if (x) {
    } else {
      break;
    }
  }
} else {
}
$(`after`);
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
$( "after" );
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
