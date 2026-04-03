# Preval test case

# math_in_closure3.md

> Math > Ai > Math in closure3
>
> Math in closure, capturing variable

## Input

`````js filename=intro
const n /*:number*/ /*truthy*/ = 100;
const tmpReturnArg /*:(number)=>number*/ = function($$0) {
  const x /*:number*/ = $$0;
  debugger;
  const tmpMCP /*:number*/ = x * n;
  const tmpBinLhs /*:number*/ = $Math_round(tmpMCP);
  const tmpReturnArg$1 /*:number*/ = tmpBinLhs / n;
  return tmpReturnArg$1;
};
const tmpCalleeParam /*:number*/ = tmpReturnArg(1.2345);
const a /*:unknown*/ = $(tmpCalleeParam);
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1.23);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1.23));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1.23 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const n = 100;
const tmpReturnArg = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const x = $dlr_$$0;
  const tmpMCP = x * n;
  const tmpBinLhs = $Math_round(tmpMCP);
  const tmpReturnArg$1 = tmpBinLhs / n;
  return tmpReturnArg$1;
};
const tmpCalleeParam = tmpReturnArg(1.2345);
const a = $(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check
- (todo) type trackeed tricks can possibly support static $Math_round


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1.23
 - 2: 1.23
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
