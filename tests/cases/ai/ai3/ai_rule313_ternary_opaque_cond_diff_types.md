# Preval test case

# ai_rule313_ternary_opaque_cond_diff_types.md

> Ai > Ai3 > Ai rule313 ternary opaque cond diff types
>
> Test: Ternary with opaque condition, branches assign different primitive types.

## Input

`````js filename=intro
// Expected: let x = $('cond') ? 123 : 'str'; $('result', x);
let x = $('cond') ? 123 : 'str';
$('result', x);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(`cond`);
if (tmpIfTest) {
  $(`result`, 123);
} else {
  $(`result`, `str`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(`cond`)) {
  $(`result`, 123);
} else {
  $(`result`, `str`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "cond" );
if (a) {
  $( "result", 123 );
}
else {
  $( "result", "str" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  x = 123;
  $(`result`, x);
} else {
  x = `str`;
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
 - 2: 'result', 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
