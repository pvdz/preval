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
const f /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const a /*:unknown*/ = $$0;
  const tmpParamBare /*:unknown*/ = $$1;
  debugger;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
    $(`inside_f`, a, a);
    return a;
  } else {
    $(`inside_f`, a, tmpParamBare);
    return tmpParamBare;
  }
};
const tmpCalleeParam$1 /*:unknown*/ = $(`argA1`);
const tmpCalleeParam /*:unknown*/ = f(tmpCalleeParam$1);
$(`call1`, tmpCalleeParam);
const tmpCalleeParam$5 /*:unknown*/ = $(`argA2`);
const tmpCalleeParam$7 /*:unknown*/ = $(`argB2`);
const tmpCalleeParam$3 /*:unknown*/ = f(tmpCalleeParam$5, tmpCalleeParam$7);
$(`call2`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, tmpParamBare) {
  if (tmpParamBare === undefined) {
    $(`inside_f`, a, a);
    return a;
  } else {
    $(`inside_f`, a, tmpParamBare);
    return tmpParamBare;
  }
};
$(`call1`, f($(`argA1`)));
const tmpCalleeParam$5 = $(`argA2`);
$(`call2`, f(tmpCalleeParam$5, $(`argB2`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = c === undefined;
  if (d) {
    $( "inside_f", b, b );
    return b;
  }
  else {
    $( "inside_f", b, c );
    return c;
  }
};
const e = $( "argA1" );
const f = a( e );
$( "call1", f );
const g = $( "argA2" );
const h = $( "argB2" );
const i = a( g, h );
$( "call2", i );
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


None


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
