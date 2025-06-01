# Preval test case

# ai_rule320_ternary_opaque_cond_branches.md

> Ai > Ai4 > Ai rule320 ternary opaque cond branches
>
> Test: Ternary operator with opaque condition and opaque branches.

## Input

`````js filename=intro
// Expected: let x; if ($('cond')) x = $('true_val'); else x = $('false_val'); $('result', x);
let x = $('cond') ? $('true_val') : $('false_val');
$('result', x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`true_val`);
  $(`result`, tmpClusterSSA_x);
} else {
  const tmpClusterSSA_x$1 /*:unknown*/ = $(`false_val`);
  $(`result`, tmpClusterSSA_x$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`result`, $(`true_val`));
} else {
  $(`result`, $(`false_val`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "true_val" );
  $( "result", b );
}
else {
  const c = $( "false_val" );
  $( "result", c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = $(`true_val`);
  $(`result`, x);
} else {
  x = $(`false_val`);
  $(`result`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'true_val'
 - 3: 'result', 'true_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
