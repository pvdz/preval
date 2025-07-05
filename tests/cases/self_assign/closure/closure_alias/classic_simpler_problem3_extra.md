# Preval test case

# classic_simpler_problem3_extra.md

> Self assign > Closure > Closure alias > Classic simpler problem3 extra

- [ ] `let f = function(){...}; f(1, 2); f(3, 4)`
- [ ] `let f = function(){...}; while (true) { f(1, 2); f(3, 4)`
- [x] `let f = function(){...}; const g = f; while(true) { g(1, 2); g(3, 4)`

## Input

`````js filename=intro
// Should NOT yet inline self_closing_decoder, because closure
let f /*:(unknown, unknown)=>unknown*/ = function(out_arg) {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  f = function(in_arg, $$1) {
    thisclosurebecomesargumentsobj = $('oh', in_arg, thisclosurebecomesargumentsobj);
  };
  const tmpReturnArg /*:unknown*/ = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g = f;
while (true) {
  const a = g(1, 2);
  const b = g(3, 4);
  $(a, b);
}
`````


## Settled


`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $(`oh`, undefined, undefined);
  $(`oh`, undefined, undefined);
  $(undefined, undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
while (true) {
  $(`oh`, undefined, undefined);
  $(`oh`, undefined, undefined);
  $(undefined, undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
while ($LOOP_NO_UNROLLS_LEFT) {
  $( "oh", undefined, undefined );
  $( "oh", undefined, undefined );
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
    thisclosurebecomesargumentsobj = $(`oh`, in_arg, thisclosurebecomesargumentsobj);
    return undefined;
  };
  const tmpReturnArg = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const g = f;
while (true) {
  const a = g(1, 2);
  const b = g(3, 4);
  $(a, b);
}
`````


## Todos triggered


- (todo) do we want to support Literal as expression statement in free loops?
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oh', undefined, undefined
 - 2: 'oh', undefined, undefined
 - 3: undefined, undefined
 - 4: 'oh', undefined, undefined
 - 5: 'oh', undefined, undefined
 - 6: undefined, undefined
 - 7: 'oh', undefined, undefined
 - 8: 'oh', undefined, undefined
 - 9: undefined, undefined
 - 10: 'oh', undefined, undefined
 - 11: 'oh', undefined, undefined
 - 12: undefined, undefined
 - 13: 'oh', undefined, undefined
 - 14: 'oh', undefined, undefined
 - 15: undefined, undefined
 - 16: 'oh', undefined, undefined
 - 17: 'oh', undefined, undefined
 - 18: undefined, undefined
 - 19: 'oh', undefined, undefined
 - 20: 'oh', undefined, undefined
 - 21: undefined, undefined
 - 22: 'oh', undefined, undefined
 - 23: 'oh', undefined, undefined
 - 24: undefined, undefined
 - 25: 'oh', undefined, undefined
 - 26: 'oh', undefined, undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
