# Preval test case

# and_8.md

> Bit hacks > If return bit > And 8
>
> Just making sure this got fixed

## Input

`````js filename=intro
function f(y) {
  const x = y & 8;
  if (x) { return 8; }
  else { return 0; }
}
$(f($(7)));
$(f($(8)));
$(f($(9)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(7);
const tmpSaooB$3 /*:number*/ = tmpCalleeParam$1 & 8;
if (tmpSaooB$3) {
  $(8);
} else {
  $(0);
}
const tmpCalleeParam$5 /*:unknown*/ = $(8);
const tmpSaooB$1 /*:number*/ = tmpCalleeParam$5 & 8;
if (tmpSaooB$1) {
  $(8);
} else {
  $(0);
}
const tmpCalleeParam$9 /*:unknown*/ = $(9);
const tmpSaooB /*:number*/ = tmpCalleeParam$9 & 8;
if (tmpSaooB) {
  $(8);
} else {
  $(0);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(7) & 8) {
  $(8);
} else {
  $(0);
}
if ($(8) & 8) {
  $(8);
} else {
  $(0);
}
if ($(9) & 8) {
  $(8);
} else {
  $(0);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 7 );
const b = a & 8;
if (b) {
  $( 8 );
}
else {
  $( 0 );
}
const c = $( 8 );
const d = c & 8;
if (d) {
  $( 8 );
}
else {
  $( 0 );
}
const e = $( 9 );
const f = e & 8;
if (f) {
  $( 8 );
}
else {
  $( 0 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = y & 8;
  if (x) {
    return 8;
  } else {
    return 0;
  }
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = $(7);
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = $(8);
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = $(9);
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 7
 - 2: 0
 - 3: 8
 - 4: 8
 - 5: 9
 - 6: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
