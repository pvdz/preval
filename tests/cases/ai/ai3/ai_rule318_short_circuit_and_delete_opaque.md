# Preval test case

# ai_rule318_short_circuit_and_delete_opaque.md

> Ai > Ai3 > Ai rule318 short circuit and delete opaque
>
> Test: Logical AND with opaque LHS, RHS is delete of opaque_obj[opaque_prop].

## Input

`````js filename=intro
// Expected: let obj = $('get_obj'); let prop = $('get_prop'); let res = $('cond') && delete obj[prop]; $('result', res); $('obj_after', obj);
let obj = $('get_obj');
let prop = $('get_prop');
let res = $('cond') && delete obj[prop];
$('result', res);
$('obj_after', obj);
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`get_obj`);
const prop /*:unknown*/ = $(`get_prop`);
const res /*:unknown*/ = $(`cond`);
if (res) {
  const tmpClusterSSA_res /*:boolean*/ = delete obj[prop];
  $(`result`, tmpClusterSSA_res);
  $(`obj_after`, obj);
} else {
  $(`result`, res);
  $(`obj_after`, obj);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`get_obj`);
const prop = $(`get_prop`);
const res = $(`cond`);
if (res) {
  $(`result`, delete obj[prop]);
  $(`obj_after`, obj);
} else {
  $(`result`, res);
  $(`obj_after`, obj);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_obj" );
const b = $( "get_prop" );
const c = $( "cond" );
if (c) {
  const d = delete a[ b ];
  $( "result", d );
  $( "obj_after", a );
}
else {
  $( "result", c );
  $( "obj_after", a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`get_obj`);
let prop = $(`get_prop`);
let res = $(`cond`);
if (res) {
  res = delete obj[prop];
  $(`result`, res);
  $(`obj_after`, obj);
} else {
  $(`result`, res);
  $(`obj_after`, obj);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj'
 - 2: 'get_prop'
 - 3: 'cond'
 - 4: 'result', true
 - 5: 'obj_after', 'get_obj'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
