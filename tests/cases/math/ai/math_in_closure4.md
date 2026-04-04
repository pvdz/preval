# Preval test case

# math_in_closure4.md

> Math > Ai > Math in closure4
>
> Math in closure, capturing variable

## Input

`````js filename=intro
const n /*:number: 100*/ /*truthy*/ = 100;
const g /*:(number)=>number*/ = function (x) {
  const a /*:number*/ = x * n;
  const b /*:number*/ = $Math_round(a);
  const r /*:number*/ = b / n;
  return r;
};
const t /*:number*/ = g(1.2345);
$(t); // Should be 1.23
`````


## Settled


`````js filename=intro
$(1.23);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1.23);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1.23 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const n = 100;
const g = function ($$0) {
  let x = $$0;
  debugger;
  const a = x * n;
  const b = $Math_round(a);
  const r = b / n;
  return r;
};
const t = g(1.2345);
$(t);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check
- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.23
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
