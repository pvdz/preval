# Preval test case

# ai_if_const_bool_var.md

> Ai > Ai1 > Ai if const bool var
>
> Test: if statement with condition from a const boolean variable.

## Input

`````js filename=intro
// Expected (true): let flag = true; let y; y = $('then'); $(y);
// Expected (false): let flag2 = false; let z; z = $('else2'); $(z);

let flag = $('true_val_ignored', true);
let y;
if (flag) {
  y = $('then');
} else {
  y = $('else_dead');
}
$(y);

let flag2 = $('false_val_ignored', false);
let z;
if (flag2) {
  z = $('then_dead2');
} else {
  z = $('else2');
}
$(z);
`````


## Settled


`````js filename=intro
const flag /*:unknown*/ = $(`true_val_ignored`, true);
if (flag) {
  const tmpClusterSSA_y /*:unknown*/ = $(`then`);
  $(tmpClusterSSA_y);
} else {
  const tmpClusterSSA_y$1 /*:unknown*/ = $(`else_dead`);
  $(tmpClusterSSA_y$1);
}
const flag2 /*:unknown*/ = $(`false_val_ignored`, false);
if (flag2) {
  const tmpClusterSSA_z /*:unknown*/ = $(`then_dead2`);
  $(tmpClusterSSA_z);
} else {
  const tmpClusterSSA_z$1 /*:unknown*/ = $(`else2`);
  $(tmpClusterSSA_z$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`true_val_ignored`, true)) {
  $($(`then`));
} else {
  $($(`else_dead`));
}
if ($(`false_val_ignored`, false)) {
  $($(`then_dead2`));
} else {
  $($(`else2`));
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "true_val_ignored", true );
if (a) {
  const b = $( "then" );
  $( b );
}
else {
  const c = $( "else_dead" );
  $( c );
}
const d = $( "false_val_ignored", false );
if (d) {
  const e = $( "then_dead2" );
  $( e );
}
else {
  const f = $( "else2" );
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let flag = $(`true_val_ignored`, true);
let y = undefined;
if (flag) {
  y = $(`then`);
  $(y);
} else {
  y = $(`else_dead`);
  $(y);
}
let flag2 = $(`false_val_ignored`, false);
let z = undefined;
if (flag2) {
  z = $(`then_dead2`);
  $(z);
} else {
  z = $(`else2`);
  $(z);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'true_val_ignored', true
 - 2: 'then'
 - 3: 'then'
 - 4: 'false_val_ignored', false
 - 5: 'then_dead2'
 - 6: 'then_dead2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
