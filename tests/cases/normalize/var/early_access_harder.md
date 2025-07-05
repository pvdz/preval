# Preval test case

# early_access_harder.md

> Normalize > Var > Early access harder
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is defined at the start, updating `x`. But the first use of `x` happens before the declaration and before the update happens.

## Input

`````js filename=intro
function f() {
  x = 10;
}
$(x); // We shouldn't break this being undefined
f();
var x; 
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  x = 10;
  return undefined;
};
$(x);
f();
$(x);
`````


## Todos triggered


- (todo) support ExpressionStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
