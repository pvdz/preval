# Preval test case

# ai_unreachable_catch_via_break.md

> Ai > Ai1 > Ai unreachable catch via break
>
> Test: Unreachable catch block due to unconditional break in try.

## Input

`````js filename=intro
// Expected: OUTER_LABEL: { try { $("in_try"); break OUTER_LABEL; } catch (e) { /* empty or removed */ } } $("after_label");
OUTER_LABEL: {
  try {
    $("in_try");
    break OUTER_LABEL;
    $("after_break_in_try_unreachable");
  } catch (e) {
    $("in_catch_UNREACHABLE");
  }
  $("after_try_catch_in_label_unreachable");
}
$("after_label");
`````


## Settled


`````js filename=intro
OUTER_LABEL: {
  try {
    $(`in_try`);
    break OUTER_LABEL;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_label_unreachable`);
}
$(`after_label`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
OUTER_LABEL: {
  try {
    $(`in_try`);
    break OUTER_LABEL;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_label_unreachable`);
}
$(`after_label`);
`````


## PST Settled
With rename=true

`````js filename=intro
OUTER_LABEL: {
  try {
    $( "in_try" );
    break OUTER_LABEL;
  }
  catch (a) {
    $( "in_catch_UNREACHABLE" );
  }
  $( "after_try_catch_in_label_unreachable" );
}
$( "after_label" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
OUTER_LABEL: {
  try {
    $(`in_try`);
    break OUTER_LABEL;
  } catch (e) {
    $(`in_catch_UNREACHABLE`);
  }
  $(`after_try_catch_in_label_unreachable`);
}
$(`after_label`);
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'in_try'
 - 2: 'after_label'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
