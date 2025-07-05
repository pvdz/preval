# Preval test case

# classic_simpler_problem1.md

> Self assign > Closure > Closure alias > Classic simpler problem1

- [x] `let f = function(){...}; f(1, 2); f(3, 4)`
- [ ] `let f = function(){...}; while (true) { f(1, 2); f(3, 4)`
- [ ] `let f = function(){...}; const g = f; while(true) { g(1, 2); g(3, 4)`

## Input

`````js filename=intro
// Should NOT inline self_closing_decoder yet, blocked by the arr
let f /*:(unknown, unknown)=>unknown*/ = function(out_arg) {
  let thisclosurebecomesargumentsobj /*:unknown*/ = undefined;
  f = function(in_arg, $$1) {
    thisclosurebecomesargumentsobj = $('oh', in_arg);
  };
  const tmpReturnArg /*:unknown*/ = f(thisclosurebecomesargumentsobj, out_arg);
  return tmpReturnArg;
};
const a = f(1, 2);
const b = f(3, 4);
$(a, b);
`````


## Settled


`````js filename=intro
$(`oh`, undefined);
$(`oh`, 3);
$(undefined, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`oh`, undefined);
$(`oh`, 3);
$(undefined, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "oh", undefined );
$( "oh", 3 );
$( undefined, undefined );
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
const a = f(1, 2);
const b = f(3, 4);
$(a, b);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'oh', undefined
 - 2: 'oh', 3
 - 3: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
