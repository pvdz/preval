# Preval test case

# classic_simpler_arr_problem3.md

> Self assign > Closure > Closure alias > Classic simpler arr problem3

- [ ] `let f = function(){...}; const x = []; f(x); f(x)`
- [ ] `let f = function(){...}; while (true) { const x = []; f(x); f(x)`
- [x] `let f = function(){...}; const g = f; while(true) { const x = []; g(x); g(x)`
- [ ] `let f = function(){...}; while (true) { const x = []; f(x); f(x)`
- [ ] `let f = function(){...}; const g = f; const x = []; while(true) { g(x); g(x)`

## Input

`````js filename=intro
// Should NOT inline self_closing_decoder yet, blocked by the arr and recursive call not using params
let f /*:(unknown, unknown)=>unknown*/ = function(out_arg) {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  f = function(in_arg, $$1) {
    thisclosurebecomesargumentsobj = $('oh', in_arg);
  };
  const tmpReturnArg /*:unknown*/ = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g = f;
while (true) {
  let arr = [];
  const a = g(arr);
  const b = g(arr);
  $(a, b);
}
`````


## Settled


`````js filename=intro
let f /*:(unknown)=>unknown*/ = function ($$0) {
  const out_arg /*:unknown*/ = $$0;
  debugger;
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  f = function ($$0, $$1) {
    const in_arg /*:unknown*/ = $$0;
    debugger;
    thisclosurebecomesargumentsobj = $(`oh`, in_arg);
    return undefined;
  };
  const tmpReturnArg /*:unknown*/ = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g /*:unknown*/ = f;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const arr /*:array*/ = [];
  const a /*:unknown*/ = g(arr);
  const b /*:unknown*/ = g(arr);
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function (out_arg) {
  let thisclosurebecomesargumentsobj = undefined;
  f = function (in_arg, $$1) {
    thisclosurebecomesargumentsobj = $(`oh`, in_arg);
  };
  const tmpReturnArg = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g = f;
while (true) {
  const arr = [];
  $(g(arr), g(arr));
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function($$0 ) {
  const b = $$0;
  debugger;
  let c = undefined;
  a = function($$0,$$1 ) {
    const d = $$0;
    debugger;
    c = $( "oh", d );
    return undefined;
  };
  const e = a( c, b );
  return e;
};
const f = a;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const g = [];
  const h = f( g );
  const i = f( g );
  $( h, i );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let out_arg = $$0;
  debugger;
  let thisclosurebecomesargumentsobj = undefined;
  f = function ($$0, $$1) {
    let in_arg = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    thisclosurebecomesargumentsobj = $(`oh`, in_arg);
    return undefined;
  };
  const tmpReturnArg = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g = f;
while (true) {
  let arr = [];
  const a = g(arr);
  const b = g(arr);
  $(a, b);
}
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) self-closing function pattern with unreachable first call arg
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oh', undefined
 - 2: 'oh', undefined
 - 3: undefined, undefined
 - 4: 'oh', undefined
 - 5: 'oh', undefined
 - 6: undefined, undefined
 - 7: 'oh', undefined
 - 8: 'oh', undefined
 - 9: undefined, undefined
 - 10: 'oh', undefined
 - 11: 'oh', undefined
 - 12: undefined, undefined
 - 13: 'oh', undefined
 - 14: 'oh', undefined
 - 15: undefined, undefined
 - 16: 'oh', undefined
 - 17: 'oh', undefined
 - 18: undefined, undefined
 - 19: 'oh', undefined
 - 20: 'oh', undefined
 - 21: undefined, undefined
 - 22: 'oh', undefined
 - 23: 'oh', undefined
 - 24: undefined, undefined
 - 25: 'oh', undefined
 - 26: 'oh', undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
