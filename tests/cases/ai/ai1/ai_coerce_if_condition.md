# Preval test case

# ai_coerce_if_condition.md

> Ai > Ai1 > Ai coerce if condition
>
> Test: Coerced opaque value used in an if condition.

## Input

`````js filename=intro
// Expected: (Coercion and conditional structure preserved)
let x_opq = $('opq_val');
let x_coerced = $coerce(x_opq, 'number'); // Assuming $coerce is available for tests
if (x_coerced) {
  $('is_truthy');
} else {
  $('is_falsy');
}
$('after', x_coerced);
`````


## Settled


`````js filename=intro
const x_opq /*:unknown*/ = $(`opq_val`);
const x_coerced /*:number*/ = $coerce(x_opq, `number`);
if (x_coerced) {
  $(`is_truthy`);
  $(`after`, x_coerced);
} else {
  $(`is_falsy`);
  $(`after`, x_coerced);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x_coerced = Number($(`opq_val`));
if (x_coerced) {
  $(`is_truthy`);
  $(`after`, x_coerced);
} else {
  $(`is_falsy`);
  $(`after`, x_coerced);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opq_val" );
const b = $coerce( a, "number" );
if (b) {
  $( "is_truthy" );
  $( "after", b );
}
else {
  $( "is_falsy" );
  $( "after", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x_opq = $(`opq_val`);
let x_coerced = $coerce(x_opq, `number`);
if (x_coerced) {
  $(`is_truthy`);
  $(`after`, x_coerced);
} else {
  $(`is_falsy`);
  $(`after`, x_coerced);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opq_val'
 - 2: 'is_falsy'
 - 3: 'after', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
