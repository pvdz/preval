# Preval test case

# bug2.md

> Static arg ops > Bug2
>
> This trips a bug in staticArgOpOutlining,

(This version without unknowns and reflection to prove outcome)

## Input

`````js filename=intro
const arr = $([100,200,300,400]);
const unknown = $(345);
const unknown2 = $(347);
const f = function() {
  debugger;
  h(1);
  g(unknown);
  g(unknown2);
  return undefined;
};
const g = function($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  if ($dlr_$$0) {
    h(709);
    return undefined;
  } else {
    return undefined;
  }
};
const h = function($$0) {
  const $dlr_$$1 = $$0;
  debugger;
  const y = $dlr_$$1 - 345;
  $(arr[y]);
  return undefined;
};
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [100, 200, 300, 400];
const arr /*:unknown*/ = $(tmpCalleeParam);
const unknown /*:unknown*/ = $(345);
const unknown2 /*:unknown*/ = $(347);
const h /*:(number)=>undefined*/ = function ($$0) {
  const tmpOutlinedParam$1 /*:number*/ = $$0;
  debugger;
  const tmpCalleeParam$1 /*:unknown*/ = arr[tmpOutlinedParam$1];
  $(tmpCalleeParam$1);
  return undefined;
};
h(-344);
if (unknown) {
  h(364);
} else {
}
if (unknown2) {
  h(364);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([100, 200, 300, 400]);
const unknown = $(345);
const unknown2 = $(347);
const h = function (tmpOutlinedParam$1) {
  $(arr[tmpOutlinedParam$1]);
};
h(-344);
if (unknown) {
  h(364);
}
if (unknown2) {
  h(364);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200, 300, 400 ];
const b = $( a );
const c = $( 345 );
const d = $( 347 );
const e = function($$0 ) {
  const f = $$0;
  debugger;
  const g = b[ f ];
  $( g );
  return undefined;
};
e( -344 );
if (c) {
  e( 364 );
}
if (d) {
  e( 364 );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [100, 200, 300, 400];
const arr = $(tmpCalleeParam);
const unknown = $(345);
const unknown2 = $(347);
const f = function () {
  debugger;
  h(1);
  g(unknown);
  g(unknown2);
  return undefined;
};
const g = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const $dlr_$$1 = $dlr_$$0;
  if ($dlr_$$1) {
    h(709);
    return undefined;
  } else {
    return undefined;
  }
};
const h = function ($$0) {
  let $dlr_$$3 = $$0;
  debugger;
  const $dlr_$$5 = $dlr_$$3;
  const y = $dlr_$$5 - 345;
  let tmpCalleeParam$1 = arr[y];
  $(tmpCalleeParam$1);
  return undefined;
};
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200, 300, 400]
 - 2: 345
 - 3: 347
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
