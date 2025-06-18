# Preval test case

# bug3.md

> Static arg ops > Bug3
>
> This trips a bug in staticArgOpOutlining,

(This version without unknowns and reflection to prove outcome)

## Input

`````js filename=intro
const tmpFree /*:(number, number)=>number*/ = function $free($$0, $$1) {
  const $dlr_$$0 /*:number*/ = $$0;
  const tmpOutlinedParam /*:number*/ = $$1;
  debugger;
  return tmpOutlinedParam;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = [ 100, 200, 300, 400 ];
const arr /*:unknown*/ = $(tmpCalleeParam);
const h /*:(number, number)=>undefined*/ = function($$0, $$1) {
  const $dlr_$$2 /*:number*/ = $$0;
  const tmpOutlinedParam$1 /*:number*/ = $$1;
  debugger;
  const y /*:number*/ = $frfr(tmpFree, $dlr_$$2, tmpOutlinedParam$1);
  const tmpCalleeParam$1 /*:unknown*/ = arr[y];
  $(tmpCalleeParam$1, y);
  return undefined;
};
h(1, -344);
const tmpSaooB$1 /*:number*/ = 709 - 345;
h(709, tmpSaooB$1);
const tmpSaooB /*:number*/ = 709 - 345;
h(709, tmpSaooB);
$(undefined);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [100, 200, 300, 400];
const arr /*:unknown*/ = $(tmpCalleeParam);
const h /*:(number)=>undefined*/ = function ($$0) {
  const $dlr_$$5 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$1 /*:unknown*/ = arr[$dlr_$$5];
  $(tmpCalleeParam$1, $dlr_$$5);
  return undefined;
};
h(-344);
h(364);
h(364);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([100, 200, 300, 400]);
const h = function ($dlr_$$5) {
  $(arr[$dlr_$$5], $dlr_$$5);
};
h(-344);
h(364);
h(364);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400 ];
const b = $( a );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = b[ d ];
  $( e, d );
  return undefined;
};
c( -344 );
c( 364 );
c( 364 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const $dlr_$$2 = $dlr_$$0;
  return $dlr_$$1;
};
const tmpCalleeParam = [100, 200, 300, 400];
const arr = $(tmpCalleeParam);
const h = function ($$0, $$1) {
  let $dlr_$$4 = $$0;
  let $dlr_$$6 = $$1;
  debugger;
  const $dlr_$$8 = $dlr_$$4;
  const tmpOutlinedParam$1 = $dlr_$$6;
  const y = $frfr(tmpFree, $dlr_$$8, $dlr_$$6);
  const tmpCalleeParam$1 = arr[y];
  $(tmpCalleeParam$1, y);
  return undefined;
};
h(1, -344);
const tmpSaooB$1 = 364;
h(709, tmpSaooB$1);
const tmpSaooB = 364;
h(709, tmpSaooB);
$(undefined);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200, 300, 400]
 - 2: undefined, -344
 - 3: undefined, 364
 - 4: undefined, 364
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
