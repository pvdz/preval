# Preval test case

# mutable_param_arr_pattern.md

> Function > Mutable param arr pattern
>
> Param names can be written to

## Input

`````js filename=intro
function f([a]) {
  a = $(10);
  return a;
}
$(f([1]));
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let a = tmpArrPatternSplat[0];
  a = $(10);
  return a;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [1];
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
