# Preval test case

# base_two_levels_1.md

> Bit hacks > And > Nested if > Nested if unspied > Base two levels 1
>
> Nested ifs that check AND on same binding can be merged in some cases

## Input

`````js filename=intro
const x = +$spy(1);
if (x & 8) {
  if (x & 2) {
    $('it is ten');
  }
}
`````

## Settled


`````js filename=intro
const tmpFree /*:(number)=>boolean*/ = function $free($$0) {
  const x$1 /*:number*/ = $$0;
  debugger;
  const tmpIfTest /*:number*/ = x$1 & 10;
  const tmpRet /*:boolean*/ = tmpIfTest === 10;
  return tmpRet;
};
const tmpUnaryArg /*:unknown*/ = $spy(1);
const x /*:number*/ = +tmpUnaryArg;
const tmpIfTest$1 /*:boolean*/ = $frfr(tmpFree, x);
if (tmpIfTest$1) {
  $(`it is ten`);
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
const tmpUnaryArg = $spy(1);
if ($frfr(tmpFree, +tmpUnaryArg)) {
  $(`it is ten`);
}
`````

## Pre Normal


`````js filename=intro
const x = +$spy(1);
if (x & 8) {
  if (x & 2) {
    $(`it is ten`);
  }
}
`````

## Normalized


`````js filename=intro
const tmpUnaryArg = $spy(1);
const x = +tmpUnaryArg;
const tmpIfTest = x & 8;
if (tmpIfTest) {
  const tmpIfTest$1 = x & 2;
  if (tmpIfTest$1) {
    $(`it is ten`);
  } else {
  }
} else {
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
const f = $spy( 1 );
const g = +f;
const h = i( a, g );
if (h) {
  $( "it is ten" );
}
`````

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
