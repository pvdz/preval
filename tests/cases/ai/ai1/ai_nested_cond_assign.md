# Preval test case

# ai_nested_cond_assign.md

> Ai > Ai1 > Ai nested cond assign
>
> Test: Nested conditional assignments to the same variable.

## Input

`````js filename=intro
// Expected: const $$i = $('initial'); let x = $$i; const $$c1 = $('c1'); if ($$c1) { const $$c2 = $('c2'); if ($$c2) { x = $('val_A'); } else { x = $('val_B'); } } else { x = $('val_C'); } $('use', x);
let x = $('initial');
if ($('c1')) {
  if ($('c2')) {
    x = $('val_A');
  } else {
    x = $('val_B');
  }
} else {
  x = $('val_C');
}
$('use', x);
`````


## Settled


`````js filename=intro
$(`initial`);
const tmpIfTest /*:unknown*/ = $(`c1`);
if (tmpIfTest) {
  const tmpIfTest$1 /*:unknown*/ = $(`c2`);
  if (tmpIfTest$1) {
    const tmpClusterSSA_x /*:unknown*/ = $(`val_A`);
    $(`use`, tmpClusterSSA_x);
  } else {
    const tmpClusterSSA_x$1 /*:unknown*/ = $(`val_B`);
    $(`use`, tmpClusterSSA_x$1);
  }
} else {
  const tmpClusterSSA_x$3 /*:unknown*/ = $(`val_C`);
  $(`use`, tmpClusterSSA_x$3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`initial`);
if ($(`c1`)) {
  if ($(`c2`)) {
    $(`use`, $(`val_A`));
  } else {
    $(`use`, $(`val_B`));
  }
} else {
  $(`use`, $(`val_C`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "initial" );
const a = $( "c1" );
if (a) {
  const b = $( "c2" );
  if (b) {
    const c = $( "val_A" );
    $( "use", c );
  }
  else {
    const d = $( "val_B" );
    $( "use", d );
  }
}
else {
  const e = $( "val_C" );
  $( "use", e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`initial`);
const tmpIfTest = $(`c1`);
if (tmpIfTest) {
  const tmpIfTest$1 = $(`c2`);
  if (tmpIfTest$1) {
    x = $(`val_A`);
    $(`use`, x);
  } else {
    x = $(`val_B`);
    $(`use`, x);
  }
} else {
  x = $(`val_C`);
  $(`use`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial'
 - 2: 'c1'
 - 3: 'c2'
 - 4: 'val_A'
 - 5: 'use', 'val_A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
