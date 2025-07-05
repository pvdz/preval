# Preval test case

# classic_simpler_problem2.md

> Self assign > Closure > Closure alias > Classic simpler problem2

- [ ] `let f = function(){...}; f(1, 2); f(3, 4)`
- [x] `let f = function(){...}; while (true) { f(1, 2); f(3, 4)`
- [ ] `let f = function(){...}; const g = f; while(true) { g(1, 2); g(3, 4)`

## Input

`````js filename=intro
// Should NOT yet inline self_closing_decoder, because closure
let f /*:(unknown, unknown)=>unknown*/ = function(out_arg) {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  f = function(in_arg, $$1) {
    thisclosurebecomesargumentsobj = $('oh', in_arg);
  };
  const tmpReturnArg /*:unknown*/ = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
while (true) {
  const a = f(1, 2);
  const b = f(3, 4);
  $(a, b);
}
`````


## Settled


`````js filename=intro
let tmpSealed /*:boolean*/ = false;
let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
while ($LOOP_NO_UNROLLS_LEFT) {
  if (tmpSealed) {
    $(`oh`, 1);
  } else {
    $(`oh`, thisclosurebecomesargumentsobj);
    tmpSealed = true;
  }
  thisclosurebecomesargumentsobj = $(`oh`, 3);
  $(undefined, undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpSealed = false;
let thisclosurebecomesargumentsobj = undefined;
while (true) {
  if (tmpSealed) {
    $(`oh`, 1);
  } else {
    $(`oh`, thisclosurebecomesargumentsobj);
    tmpSealed = true;
  }
  thisclosurebecomesargumentsobj = $(`oh`, 3);
  $(undefined, undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = false;
let b = undefined;
while ($LOOP_NO_UNROLLS_LEFT) {
  if (a) {
    $( "oh", 1 );
  }
  else {
    $( "oh", b );
    a = true;
  }
  b = $( "oh", 3 );
  $( undefined, undefined );
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
while (true) {
  const a = f(1, 2);
  const b = f(3, 4);
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oh', undefined
 - 2: 'oh', 3
 - 3: undefined, undefined
 - 4: 'oh', 1
 - 5: 'oh', 3
 - 6: undefined, undefined
 - 7: 'oh', 1
 - 8: 'oh', 3
 - 9: undefined, undefined
 - 10: 'oh', 1
 - 11: 'oh', 3
 - 12: undefined, undefined
 - 13: 'oh', 1
 - 14: 'oh', 3
 - 15: undefined, undefined
 - 16: 'oh', 1
 - 17: 'oh', 3
 - 18: undefined, undefined
 - 19: 'oh', 1
 - 20: 'oh', 3
 - 21: undefined, undefined
 - 22: 'oh', 1
 - 23: 'oh', 3
 - 24: undefined, undefined
 - 25: 'oh', 1
 - 26: 'oh', 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
