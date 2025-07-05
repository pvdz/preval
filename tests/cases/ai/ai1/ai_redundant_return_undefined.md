# Preval test case

# ai_redundant_return_undefined.md

> Ai > Ai1 > Ai redundant return undefined
>
> Test: Redundant explicit 'return undefined;' at function end.

## Input

`````js filename=intro
// Expected: function f() { $("work"); } $("called f"); let result = f(); $("result_is_undefined", result === undefined);
function f() {
  $("work");
  return undefined; // This might be redundant
}
$("called f");
let result = f();
$("result_is_undefined", result === undefined);
`````


## Settled


`````js filename=intro
$(`called f`);
$(`work`);
$(`result_is_undefined`, true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`called f`);
$(`work`);
$(`result_is_undefined`, true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "called f" );
$( "work" );
$( "result_is_undefined", true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(`work`);
  return undefined;
};
$(`called f`);
let result = f();
let tmpCalleeParam = result === undefined;
$(`result_is_undefined`, tmpCalleeParam);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'called f'
 - 2: 'work'
 - 3: 'result_is_undefined', true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
