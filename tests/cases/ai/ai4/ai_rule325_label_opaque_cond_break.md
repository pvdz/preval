# Preval test case

# ai_rule325_label_opaque_cond_break.md

> Ai > Ai4 > Ai rule325 label opaque cond break
>
> Test: Labeled statement with an opaque conditional break.

## Input

`````js filename=intro
// Expected: outer: { $('block_start'); if ($('break_cond')) { break outer; } $('after_cond'); } $('after_label');
outer: {
  $('block_start');
  if ($('break_cond')) {
    break outer;
  }
  $('after_cond');
}
$('after_label');
`````


## Settled


`````js filename=intro
$(`block_start`);
const tmpIfTest /*:unknown*/ = $(`break_cond`);
if (tmpIfTest) {
  $(`after_label`);
} else {
  $(`after_cond`);
  $(`after_label`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`block_start`);
if ($(`break_cond`)) {
  $(`after_label`);
} else {
  $(`after_cond`);
  $(`after_label`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "block_start" );
const a = $( "break_cond" );
if (a) {
  $( "after_label" );
}
else {
  $( "after_cond" );
  $( "after_label" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
outer: {
  $(`block_start`);
  const tmpIfTest = $(`break_cond`);
  if (tmpIfTest) {
    break outer;
  } else {
    $(`after_cond`);
  }
}
$(`after_label`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'block_start'
 - 2: 'break_cond'
 - 3: 'after_label'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
