# Preval test case

# early_access_hard.md

> Normalize > Var > Early access hard
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is declared at the end, appearing after the `var` statement in the source code. Should `x` be updated here? No, because `f` is hoisted.

## Input

`````js filename=intro
$(f()); // We shouldn't break this being undefined
var x = 10; 
$(f());
function f() {
  return x;
}
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
  return x;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
x = 10;
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


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
