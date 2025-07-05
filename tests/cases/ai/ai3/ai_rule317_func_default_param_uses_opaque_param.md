# Preval test case

# ai_rule317_func_default_param_uses_opaque_param.md

> Ai > Ai3 > Ai rule317 func default param uses opaque param
>
> Test: Function default parameter uses an earlier opaque parameter.

## Input

`````js filename=intro
// Expected: function f(a, b = a) { $('inside_f', a, b); return b; } $('call1', f($('argA1'))); $('call2', f($('argA2'), $('argB2')));
function f(a, b = a) {
  $('inside_f', a, b);
  return b;
}
$('call1', f($('argA1')));
$('call2', f($('argA2'), $('argB2')));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(`argA1`);
$(`inside_f`, tmpCalleeParam$1, tmpCalleeParam$1);
$(`call1`, tmpCalleeParam$1);
const tmpCalleeParam$5 /*:unknown*/ = $(`argA2`);
const tmpCalleeParam$7 /*:unknown*/ = $(`argB2`);
const tmpSaooB /*:boolean*/ = tmpCalleeParam$7 === undefined;
if (tmpSaooB) {
  $(`inside_f`, tmpCalleeParam$5, tmpCalleeParam$5);
  $(`call2`, tmpCalleeParam$5);
} else {
  $(`inside_f`, tmpCalleeParam$5, tmpCalleeParam$7);
  $(`call2`, tmpCalleeParam$7);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(`argA1`);
$(`inside_f`, tmpCalleeParam$1, tmpCalleeParam$1);
$(`call1`, tmpCalleeParam$1);
const tmpCalleeParam$5 = $(`argA2`);
const tmpCalleeParam$7 = $(`argB2`);
if (tmpCalleeParam$7 === undefined) {
  $(`inside_f`, tmpCalleeParam$5, tmpCalleeParam$5);
  $(`call2`, tmpCalleeParam$5);
} else {
  $(`inside_f`, tmpCalleeParam$5, tmpCalleeParam$7);
  $(`call2`, tmpCalleeParam$7);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "argA1" );
$( "inside_f", a, a );
$( "call1", a );
const b = $( "argA2" );
const c = $( "argB2" );
const d = c === undefined;
if (d) {
  $( "inside_f", b, b );
  $( "call2", b );
}
else {
  $( "inside_f", b, c );
  $( "call2", c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1) {
  let a = $$0;
  const tmpParamBare = $$1;
  debugger;
  let b = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    b = a;
    $(`inside_f`, a, a);
    return b;
  } else {
    b = tmpParamBare;
    $(`inside_f`, a, tmpParamBare);
    return b;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(`argA1`);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(`call1`, tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = $(`argA2`);
let tmpCalleeParam$7 = $(`argB2`);
let tmpCalleeParam$3 = f(tmpCalleeParam$5, tmpCalleeParam$7);
$(`call2`, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'argA1'
 - 2: 'inside_f', 'argA1', 'argA1'
 - 3: 'call1', 'argA1'
 - 4: 'argA2'
 - 5: 'argB2'
 - 6: 'inside_f', 'argA2', 'argB2'
 - 7: 'call2', 'argB2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
