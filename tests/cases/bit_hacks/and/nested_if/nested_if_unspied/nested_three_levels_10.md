# Preval test case

# nested_three_levels_10.md

> Bit hacks > And > Nested if > Nested if unspied > Nested three levels 10
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 7-way options in a Set.

Something like `new Set([2, 8, 10, 32, 34, 40, 42]).has(n)`

## Input

`````js filename=intro
const x = +$spy(10);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      $('it is 42');
    }
  }
}
`````


## Settled


`````js filename=intro
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const tmpIfTest /*:number*/ /*&10*/ = x$1 & 10;
  const tmpRet /*:boolean*/ = tmpIfTest === 10;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $spy(10);
const x /*:number*/ = +tmpUnaryArg;
const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree, x);
if (tmpIfTest$1) {
  const tmpIfTest$3 /*:number*/ /*&32*/ /*oneBitAnded*/ = x & 32;
  if (tmpIfTest$3) {
    $(`it is 42`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x$1) {
  const tmpRet = (x$1 & 10) === 10;
  return tmpRet;
};
const tmpUnaryArg = $spy(10);
const x = +tmpUnaryArg;
if (tmpFree(x)) {
  if (x & 32) {
    $(`it is 42`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c & 10;
  const e = d === 10;
  return e;
};
const f = $spy( 10 );
const g = +f;
const h = i( a, g );
if (h) {
  const j = g & 32;
  if (j) {
    $( "it is 42" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpUnaryArg = $spy(10);
const x = +tmpUnaryArg;
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    const tmpIfTest$3 = x & 32;
    if (tmpIfTest$3) {
      $(`it is 42`);
    } else {
    }
  } else {
  }
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: '$spy[1].valueOf()', 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
