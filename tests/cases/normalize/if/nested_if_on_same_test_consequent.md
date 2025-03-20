# Preval test case

# nested_if_on_same_test_consequent.md

> Normalize > If > Nested if on same test consequent
>
> A nested if testing the same binding can be collapsed

## Input

`````js filename=intro
if ($) {
  if ($) { // This if should be eliminated
    $('keep me');
  } else {
    $('eliminate me');
  }
}
`````


## Settled


`````js filename=intro
if ($) {
  $(`keep me`);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`keep me`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "keep me" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'keep me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
