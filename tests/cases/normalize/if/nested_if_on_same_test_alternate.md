# Preval test case

# nested_if_on_same_test_alternate.md

> Normalize > If > Nested if on same test alternate
>
> A nested if testing the same binding can be collapsed

## Input

`````js filename=intro
if ($) {
} else {
  if ($) { // This if should be eliminated
    $('eliminate me');
  } else {
    $('keep me');
  }
}
`````


## Settled


`````js filename=intro
if ($) {
} else {
  $(`keep me`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  $(`keep me`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {

}
else {
  $( "keep me" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
