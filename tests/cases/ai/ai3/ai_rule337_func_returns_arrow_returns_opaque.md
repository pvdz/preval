# Preval test case

# ai_rule337_func_returns_arrow_returns_opaque.md

> Ai > Ai3 > Ai rule337 func returns arrow returns opaque
>
> Test: Function returns arrow function which returns opaque value.

## Input

`````js filename=intro
// Expected: function getArr() { return () => $('val'); } let arr = getArr(); $('res', arr());
function getArrowFunc() {
  $('outer_func_called');
  return () => {
    $('arrow_func_called');
    return $('inner_opaque_val');
  };
}
let arrow = getArrowFunc();
let result = arrow();
$('final_result', result);
`````


## Settled


`````js filename=intro
$(`outer_func_called`);
$(`arrow_func_called`);
const tmpReturnArg$1 /*:unknown*/ = $(`inner_opaque_val`);
$(`final_result`, tmpReturnArg$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`outer_func_called`);
$(`arrow_func_called`);
$(`final_result`, $(`inner_opaque_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "outer_func_called" );
$( "arrow_func_called" );
const a = $( "inner_opaque_val" );
$( "final_result", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let getArrowFunc = function () {
  debugger;
  $(`outer_func_called`);
  const tmpReturnArg = function () {
    debugger;
    $(`arrow_func_called`);
    const tmpReturnArg$1 = $(`inner_opaque_val`);
    return tmpReturnArg$1;
  };
  return tmpReturnArg;
};
let arrow = getArrowFunc();
let result = arrow();
$(`final_result`, result);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'outer_func_called'
 - 2: 'arrow_func_called'
 - 3: 'inner_opaque_val'
 - 4: 'final_result', 'inner_opaque_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
