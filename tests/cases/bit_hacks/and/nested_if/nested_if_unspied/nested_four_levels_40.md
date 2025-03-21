# Preval test case

# nested_four_levels_40.md

> Bit hacks > And > Nested if > Nested if unspied > Nested four levels 40
>
> Nested ifs that check AND on same binding can be merged in some cases

Next level is wondering whether we want to do the 14-way options in a Set.

Something like `new Set([2, 8, 10, 16, 18, 24, 26, 32, 34, 40, 42, 48, 50, 60]).has(n)`

## Input

`````js filename=intro
const x = +$spy(40);
if (x & 8) {
  if (x & 2) {
    if (x & 32) {
      if (x & 16) {
        $('it is 58');
      }
    }
  }
}
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const tmpIfTest /*:number*/ = x$1 & 10;
  const tmpRet$1 /*:boolean*/ = tmpIfTest === 10;
  return tmpRet$1;
};
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$3 /*:number*/ = $$0;
  debugger;
  const tmpIfTest$3 /*:number*/ = x$3 & 48;
  const tmpRet /*:boolean*/ = tmpIfTest$3 === 48;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $spy(40);
const x /*:number*/ = +tmpUnaryArg;
const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree$1, x);
if (tmpIfTest$1) {
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
const tmpFree$1 = function $free(x$1) {
  const tmpRet$1 = (x$1 & 10) === 10;
  return tmpRet$1;
};
const tmpFree = function $free(x$3) {
  const tmpRet = (x$3 & 48) === 48;
  return tmpRet;
};
const tmpUnaryArg = $spy(40);
const x = +tmpUnaryArg;
if ($frfr(tmpFree$1, x)) {
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
  const d = c & 10;
  const e = d === 10;
  return e;
};
const f = function b($$0 ) {
  const g = $$0;
  debugger;
  const h = g & 48;
  const i = h === 48;
  return i;
};
const j = $spy( 40 );
const k = +j;
const l = m( a, k );
if (l) {
  const n = m( f, k );
  if (n) {
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
 - 1: 'Creating spy', 1, 1, [40, 40]
 - 2: '$spy[1].valueOf()', 40
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
