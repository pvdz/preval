# Preval test case

# dupe.md

> Free > Dupe
>
> This case was injecting double expression at some point

## Input

`````js filename=intro
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  const tmpIfTest$3 = x & 48;
  const tmpIfTest$5 = tmpIfTest$3 === 48;
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {}
} else {}
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const tmpIfTest$3 /*:number*/ = x$1 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
if (x) {
  const tmpIfTest$5 /*:boolean*/ = $frfr(tmpFree, x);
  if (tmpIfTest$5) {
    $(`it is 58`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x$1) {
  const tmpRet = (x$1 & 48) === 48;
  return tmpRet;
};
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
if (x) {
  if ($frfr(tmpFree, x)) {
    $(`it is 58`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c & 48;
  const e = d === 48;
  return e;
};
const f = $spy( 1 );
const g = +f;
if (g) {
  const h = i( a, g );
  if (h) {
    $( "it is 58" );
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
