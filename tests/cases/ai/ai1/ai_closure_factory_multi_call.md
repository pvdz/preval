# Preval test case

# ai_closure_factory_multi_call.md

> Ai > Ai1 > Ai closure factory multi call
>
> Test: Function returns func closing over param, outer called multiple times.

## Input

`````js filename=intro
// Expected: (Preservation of distinct closures f1 -> A, f2 -> B)
function factory(p_outer) {
  $('f_init', p_outer);
  return function inner() {
    $('i_call', p_outer);
  };
}
let f1 = factory($('A'));
let f2 = factory($('B'));
f1();
f2();
`````


## Settled


`````js filename=intro
const factory /*:(unknown)=>function*/ = function ($$0) {
  const p_outer /*:unknown*/ = $$0;
  debugger;
  $(`f_init`, p_outer);
  const inner /*:()=>undefined*/ = function () {
    debugger;
    $(`i_call`, p_outer);
    return undefined;
  };
  return inner;
};
const tmpCalleeParam /*:unknown*/ = $(`A`);
const f1 /*:function*/ /*truthy*/ = factory(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = $(`B`);
const f2 /*:function*/ /*truthy*/ = factory(tmpCalleeParam$1);
f1();
f2();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const factory = function (p_outer) {
  $(`f_init`, p_outer);
  const inner = function () {
    $(`i_call`, p_outer);
  };
  return inner;
};
const f1 = factory($(`A`));
const f2 = factory($(`B`));
f1();
f2();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "f_init", b );
  const c = function() {
    debugger;
    $( "i_call", b );
    return undefined;
  };
  return c;
};
const d = $( "A" );
const e = a( d );
const f = $( "B" );
const g = a( f );
e();
g();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let factory = function ($$0) {
  let p_outer = $$0;
  debugger;
  $(`f_init`, p_outer);
  let inner = function () {
    debugger;
    $(`i_call`, p_outer);
    return undefined;
  };
  return inner;
};
const tmpCallCallee = factory;
let tmpCalleeParam = $(`A`);
let f1 = factory(tmpCalleeParam);
const tmpCallCallee$1 = factory;
let tmpCalleeParam$1 = $(`B`);
let f2 = factory(tmpCalleeParam$1);
f1();
f2();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'f_init', 'A'
 - 3: 'B'
 - 4: 'f_init', 'B'
 - 5: 'i_call', 'A'
 - 6: 'i_call', 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
