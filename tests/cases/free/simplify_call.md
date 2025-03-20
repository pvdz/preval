# Preval test case

# simplify_call.md

> Free > Simplify call
>
> There was a problem where a $frfr that would be simplified
> would get its first arg aliased, which would trigger an assertion
> error that asserts that the first arg to $frfr always be a $free ref
> This is a test artifact more than anything else because it would
> only appear when the input code contained a $frfr with complex arg.

## Input

`````js filename=intro
const tmpFree$21 = function $free(tmpUnaryArg$489) {
  const tmpBinLhs$139/*:number*/ = -tmpUnaryArg$489;
  const tmpBinLhs$141/*:number*/ = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b/*:array*/ = ['a', 'b'];
const _0xcb1177/*:unknown*/ = $;
try {
  if ($frfr(tmpFree$21, parseInt(_0xcb1177(824)))) {
  } else {
    _0xb34c4b.push(_0xb34c4b.shift());
  }
} catch (_0xa7aced$11) {
  _0xb34c4b.push(_0xb34c4b.shift());
}
$('thend');
`````

## Settled


`````js filename=intro
const tmpFree$21 /*:(number)=>number*/ = function $free($$0) {
  const tmpUnaryArg$489 /*:number*/ = $$0;
  debugger;
  const tmpBinLhs$139 /*:number*/ = -tmpUnaryArg$489;
  const tmpBinLhs$141 /*:number*/ = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b /*:array*/ = [`a`, `b`];
try {
  const tmpCalleeParam$3 /*:unknown*/ = $(824);
  const tmpCalleeParam$1 /*:number*/ = parseInt(tmpCalleeParam$3);
  const tmpIfTest /*:number*/ = $frfr(tmpFree$21, tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = _0xb34c4b.shift();
    _0xb34c4b.push(tmpCalleeParam$5);
  }
} catch (_0xa7aced$11) {
  const tmpCalleeParam$7 /*:unknown*/ = _0xb34c4b.shift();
  _0xb34c4b.push(tmpCalleeParam$7);
}
$(`thend`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$21 = function $free(tmpUnaryArg$489) {
  const tmpBinLhs$139 = -tmpUnaryArg$489;
  const tmpBinLhs$141 = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b = [`a`, `b`];
try {
  if (!$frfr(tmpFree$21, parseInt($(824)))) {
    _0xb34c4b.push(_0xb34c4b.shift());
  }
} catch (_0xa7aced$11) {
  _0xb34c4b.push(_0xb34c4b.shift());
}
$(`thend`);
`````

## Pre Normal


`````js filename=intro
const tmpFree$21 = function $free($$0) {
  let tmpUnaryArg$489 = $$0;
  debugger;
  const tmpBinLhs$139 = -tmpUnaryArg$489;
  const tmpBinLhs$141 = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b = [`a`, `b`];
const _0xcb1177 = $;
try {
  if ($frfr(tmpFree$21, parseInt(_0xcb1177(824)))) {
  } else {
    _0xb34c4b.push(_0xb34c4b.shift());
  }
} catch (_0xa7aced$11) {
  _0xb34c4b.push(_0xb34c4b.shift());
}
$(`thend`);
`````

## Normalized


`````js filename=intro
const tmpFree$21 = function $free($$0) {
  let tmpUnaryArg$489 = $$0;
  debugger;
  const tmpBinLhs$139 = -tmpUnaryArg$489;
  const tmpBinLhs$141 = -tmpBinLhs$139;
  return tmpBinLhs$141;
};
const _0xb34c4b = [`a`, `b`];
const _0xcb1177 = $;
try {
  const tmpCalleeParam = tmpFree$21;
  const tmpCalleeParam$3 = _0xcb1177(824);
  const tmpCalleeParam$1 = parseInt(tmpCalleeParam$3);
  const tmpIfTest = $frfr(tmpFree$21, tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpCallObj = _0xb34c4b;
    const tmpCallVal = tmpCallObj.push;
    const tmpCalleeParam$5 = _0xb34c4b.shift();
    $dotCall(tmpCallVal, tmpCallObj, `push`, tmpCalleeParam$5);
  }
} catch (_0xa7aced$11) {
  const tmpCallObj$1 = _0xb34c4b;
  const tmpCallVal$1 = tmpCallObj$1.push;
  const tmpCalleeParam$7 = _0xb34c4b.shift();
  $dotCall(tmpCallVal$1, tmpCallObj$1, `push`, tmpCalleeParam$7);
}
$(`thend`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = -c;
  const e = -d;
  return e;
};
const f = [ "a", "b" ];
try {
  const g = $( 824 );
  const h = parseInt( g );
  const i = j( a, h );
  if (i) {

  }
  else {
    const k = f.shift();
    f.push( k );
  }
}
catch (l) {
  const m = f.shift();
  f.push( m );
}
$( "thend" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 824
 - 2: 'thend'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
