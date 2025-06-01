# Preval test case

# ai_var_copy_cond_modify.md

> Ai > Ai1 > Ai var copy cond modify
>
> Test: Redundant variable copy before conditional modification and use.

## Input

`````js filename=intro
// Expected: const $$v = $('V'); let y; const $$c = $('C'); if ($$c) { y = $('M'); } else { y = $$v; } $('use', y);
let x = $('V');
let y = x;
if ($('C')) {
  y = $('M');
}
$('use', y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(`V`);
const tmpIfTest /*:unknown*/ = $(`C`);
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = $(`M`);
  $(`use`, tmpClusterSSA_y);
} else {
  $(`use`, y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(`V`);
if ($(`C`)) {
  $(`use`, $(`M`));
} else {
  $(`use`, y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "V" );
const b = $( "C" );
if (b) {
  const c = $( "M" );
  $( "use", c );
}
else {
  $( "use", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`V`);
let y = x;
const tmpIfTest = $(`C`);
if (tmpIfTest) {
  y = $(`M`);
  $(`use`, y);
} else {
  $(`use`, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'V'
 - 2: 'C'
 - 3: 'M'
 - 4: 'use', 'M'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
