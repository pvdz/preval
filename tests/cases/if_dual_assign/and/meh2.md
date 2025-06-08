# Preval test case

# meh2.md

> If dual assign > And > Meh2
>
> imafool

## Input

`````js filename=intro
const f = function (){
  const x = $spy()
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
$(f());
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:()=>number*/ = function () {
  debugger;
  const x /*:unknown*/ = $spy();
  const t /*:number*/ /*&8192*/ /*oneBitAnded*/ = x & 8192;
  if (t) {
    return 128;
  } else {
    const r /*:number*/ /*&128*/ /*oneBitAnded*/ = x & 128;
    return r;
  }
};
const tmpCalleeParam /*:number*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = f();
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $spy();
  if (x & 8192) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
$(f());
$(f());
$(f());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $spy();
  const c = b & 8192;
  if (c) {
    return 128;
  }
  else {
    const d = b & 128;
    return d;
  }
};
const e = a();
$( e );
const f = a();
$( f );
const g = a();
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const x = $spy();
  const t = x & 8192;
  if (t) {
    return 128;
  } else {
    const r = x & 128;
    return r;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: 128
 - 4: 'Creating spy', 2, 0, ['spy', 12345]
 - 5: '$spy[2].valueOf()'
 - 6: 128
 - 7: 'Creating spy', 3, 0, ['spy', 12345]
 - 8: '$spy[3].valueOf()'
 - 9: 128
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
