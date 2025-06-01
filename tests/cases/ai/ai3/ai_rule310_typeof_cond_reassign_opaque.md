# Preval test case

# ai_rule310_typeof_cond_reassign_opaque.md

> Ai > Ai3 > Ai rule310 typeof cond reassign opaque
>
> Test: typeof on a variable that is string then conditionally reassigned to an opaque value.

## Input

`````js filename=intro
// Expected: let x = 's'; if ($('cond')) x = $('v'); let t = typeof x; $('result', t);
let x = 's';
if ($('cond')) {
  x = $('v');
}
let t = typeof x;
$('result', t);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`v`);
  const tmpClusterSSA_t /*:string*/ = typeof tmpClusterSSA_x;
  $(`result`, tmpClusterSSA_t);
} else {
  $(`result`, `string`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  const tmpClusterSSA_x = $(`v`);
  $(`result`, typeof tmpClusterSSA_x);
} else {
  $(`result`, `string`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  const b = $( "v" );
  const c = typeof b;
  $( "result", c );
}
else {
  $( "result", "string" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = `s`;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = $(`v`);
} else {
}
let t = typeof x;
$(`result`, t);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'v'
 - 3: 'result', 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
