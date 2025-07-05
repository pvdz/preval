# Preval test case

# ai_iife_like_dollar_return.md

> Ai > Ai1 > Ai iife like dollar return
>
> Test: IIFE-like pattern with $() in return, checking for inlining.

## Input

`````js filename=intro
// Expected: const $$0 = $('ret_val'); $('use', $$0);
function foo() {
  return $('ret_val');
}
let result = foo();
$('use', result);
`````


## Settled


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(`ret_val`);
$(`use`, tmpReturnArg);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $(`ret_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "ret_val" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let foo = function () {
  debugger;
  const tmpReturnArg = $(`ret_val`);
  return tmpReturnArg;
};
let result = foo();
$(`use`, result);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ret_val'
 - 2: 'use', 'ret_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
