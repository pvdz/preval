# Preval test case

# var_pattern_for_regular_func_top.md

> Normalize > Hoisting > Base > Var pattern for regular func top
>
> Hosting in a block should end up in the parent

## Input

`````js filename=intro
function f() {
  $(x);
  for (var [x] = [10];false;);
  $(x);
}
f();
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
let f = function () {
  debugger;
  let x = undefined;
  $(undefined);
  const tmpArrAssignPatternRhs = [10];
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  x = tmpArrPatternSplat[0];
  $(x);
  return undefined;
};
f();
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
