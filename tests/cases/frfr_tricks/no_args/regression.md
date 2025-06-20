# Preval test case

# regression.md

> Frfr tricks > No args > Regression
>
> When a $frfr has no args we should be able to statically resolve it
> knowing that it has no side effects at all.
> This case popped up because freeB could't be eliminated (at the time 
> of writing) because it was also called with unresolved args.
> However, left or right, the free without args implies that it can be
> resolved and so we should. But it wasn't.
>
> One reason it temporarily showed up on the radar was a regression in
> excessive arg pruning. Once that's fixed this test case won't cover
> the real case anymore, but that's an aside.

## Input

`````js filename=intro
const a = $(1);
const b = $(1);
const c = $(1);
const d = $(1);

const freeA/*:()=>number*/ = function $free() {
  debugger;
  const tmpFrfrOutline$7/*:number*/ = $frfr(freeB, -659, 757);
  const tmpRet$11/*:number*/ = tmpFrfrOutline$7 - 359;
  return tmpRet$11;
};
const freeB = function $free($$0) {
  const tmpOutlinedParam/*:number*/ = $$0;
  debugger;
  const tmpRet/*:number*/ = tmpOutlinedParam - 554;
  const tmpCalleeParam$271/*:number*/ = tmpRet - 442;
  const tmpRet$89/*:number*/ = tmpCalleeParam$271 - (-808);
  return tmpRet$89;
};

const x/*:number*/ = $frfr(freeA);
const y/*:number*/ = $frfr(freeB, a, b);
$(x, y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const b /*:unknown*/ = $(1);
$(1);
$(1);
const freeB /*:(unknown)=>number*/ = function $free($$0) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  debugger;
  const tmpRet /*:number*/ = $dlr_$$0 - 554;
  const tmpCalleeParam$271 /*:number*/ = tmpRet - 442;
  const tmpRet$89 /*:number*/ = tmpCalleeParam$271 - -808;
  return tmpRet$89;
};
const y /*:number*/ = $frfr(freeB, a, b);
$(-1206, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
const b = $(1);
$(1);
$(1);
$(
  -1206,
  $frfr(
    function $free($dlr_$$0) {
      const tmpRet$89 = $dlr_$$0 - 554 - 442 - -808;
      return tmpRet$89;
    },
    a,
    b,
  ),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
$( 1 );
$( 1 );
const c = function d($$0 ) {
  const e = $$0;
  debugger;
  const f = e - 554;
  const g = f - 442;
  const h = g - -808;
  return h;
};
const i = j( c, a, b );
$( -1206, i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = $(1);
const c = $(1);
const d = $(1);
const freeA = function $free() {
  debugger;
  const tmpFrfrOutline$7 = $frfr(freeB, -659, 757);
  const tmpRet$11 = tmpFrfrOutline$7 - 359;
  return tmpRet$11;
};
const freeB = function $free($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const tmpOutlinedParam = $dlr_$$0;
  const tmpRet = tmpOutlinedParam - 554;
  const tmpCalleeParam$271 = tmpRet - 442;
  const tmpRet$89 = tmpCalleeParam$271 - -808;
  return tmpRet$89;
};
const x = $frfr(freeA);
const y = $frfr(freeB, a, b);
$(x, y);
`````


## Todos triggered


- (todo) free with zero args, we can eliminate this?
- (todo) frfr and free arg mismatch


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: -1206, -187
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
