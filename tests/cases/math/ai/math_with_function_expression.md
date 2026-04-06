# Preval test case

# math_with_function_expression.md

> Math > Ai > Math with function expression
>
> Math in function expression

## Input

`````js filename=intro
const f = function(x) { return Math.exp(x); };
const a = $(f(1));
$(a);
// Should be Math.E
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(2.718281828459045);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(2.718281828459045));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2.718281828459045 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpMCF = $Math_exp;
  const tmpReturnArg = $Math_exp(x);
  return tmpReturnArg;
};
let tmpCalleeParam = f(1);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_exp


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2.718281828459045
 - 2: 2.718281828459045
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
