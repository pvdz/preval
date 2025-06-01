# Preval test case

# ai_func_length_default_rest.md

> Ai > Ai1 > Ai func length default rest
>
> Test: Function.length with default and rest parameters.

Not sure yet how I'll fix this one but the default and spread combination mess with the function length so after
normalization that value is no longer the same. Kinda stinks.

## Input

`````js filename=intro
// Expected: $('f_len', 1);
function f(a, b = $('default_B'), ...c) {
  $('body', a, b, c.length);
}
$('f_len', f.length);
f($('A_val'));
`````


## Settled


`````js filename=intro
const f /*:(unknown, unknown, array)=>undefined*/ = function ($$0, $$1, ...$$2 /*:array*/) {
  const a /*:unknown*/ = $$0;
  const tmpParamBare /*:unknown*/ = $$1;
  const c /*:array*/ = $$2;
  debugger;
  let b /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
    b = $(`default_B`);
  } else {
    b = tmpParamBare;
  }
  const tmpCalleeParam$3 /*:number*/ = c.length;
  $(`body`, a, b, tmpCalleeParam$3);
  return undefined;
};
const tmpCalleeParam$5 /*:number*/ = f.length;
$(`f_len`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:unknown*/ = $(`A_val`);
f(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a, tmpParamBare, ...$$2 /*:array*/) {
  const c = $$2;
  let b = undefined;
  if (tmpParamBare === undefined) {
    b = $(`default_B`);
  } else {
    b = tmpParamBare;
  }
  $(`body`, a, b, c.length);
};
$(`f_len`, f.length);
f($(`A_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  let e = undefined;
  const f = c === undefined;
  if (f) {
    e = $( "default_B" );
  }
  else {
    e = c;
  }
  const g = d.length;
  $( "body", b, e, g );
  return undefined;
};
const h = a.length;
$( "f_len", h );
const i = $( "A_val" );
a( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0, $$1, ...$$2 /*:array*/) {
  let a = $$0;
  const tmpParamBare = $$1;
  let c = $$2;
  debugger;
  let b = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    b = $(`default_B`);
  } else {
    b = tmpParamBare;
  }
  let tmpCalleeParam = a;
  let tmpCalleeParam$1 = b;
  let tmpCalleeParam$3 = c.length;
  $(`body`, tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  return undefined;
};
let tmpCalleeParam$5 = f.length;
$(`f_len`, tmpCalleeParam$5);
const tmpCallCallee = f;
let tmpCalleeParam$7 = $(`A_val`);
f(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'f_len', 1
 - 2: 'A_val'
 - 3: 'default_B'
 - 4: 'body', 'A_val', 'default_B', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !1: 'f_len', 2
 -  2: 'A_val'
 -  3: 'default_B'
 -  4: 'body', 'A_val', 'default_B', 0
 -  eval returned: undefined

Post settled calls: BAD!!
 - !1: 'f_len', 2
 -  2: 'A_val'
 -  3: 'default_B'
 -  4: 'body', 'A_val', 'default_B', 0
 -  eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'f_len', 2
 -  2: 'A_val'
 -  3: 'default_B'
 -  4: 'body', 'A_val', 'default_B', 0
 -  eval returned: undefined
