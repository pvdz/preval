# Preval test case

# already_numbers.md

> Coerce > Already numbers
>
>

## Input

`````js filename=intro
const x = Number($spy(1));
const y = Number($spy(2));
const a = x * 1;
const b = y * 1;
$(`${a}${b}`);
`````


## Settled


`````js filename=intro
const tmpFree /*:(number, number)=>string*/ = function $free($$0, $$1) {
  const x$1 /*:number*/ = $$0;
  const y$1 /*:number*/ = $$1;
  debugger;
  const a /*:number*/ = x$1 * 1;
  const tmpBinBothLhs /*:string*/ = $coerce(a, `string`);
  const b /*:number*/ = y$1 * 1;
  const tmpBinBothRhs /*:string*/ = $coerce(b, `string`);
  const tmpRet /*:string*/ = tmpBinBothLhs + tmpBinBothRhs;
  return tmpRet;
};
const tmpCalleeParam /*:unknown*/ = $spy(1);
const x /*:number*/ = $coerce(tmpCalleeParam, `number`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(2);
const y /*:number*/ = $coerce(tmpCalleeParam$1, `number`);
const tmpCalleeParam$3 /*:string*/ = $frfr(tmpFree, x, y);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(x$1, y$1) {
  const tmpRet = $coerce(x$1 * 1, `string`) + $coerce(y$1 * 1, `string`);
  return tmpRet;
};
const x = $coerce($spy(1), `number`);
$($frfr(tmpFree, x, $coerce($spy(2), `number`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c * 1;
  const f = $coerce( e, "string" );
  const g = d * 1;
  const h = $coerce( g, "string" );
  const i = f + h;
  return i;
};
const j = $spy( 1 );
const k = $coerce( j, "number" );
const l = $spy( 2 );
const m = $coerce( l, "number" );
const n = o( a, k, m );
$( n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy(1);
const x = $coerce(tmpCalleeParam, `number`);
let tmpCalleeParam$1 = $spy(2);
const y = $coerce(tmpCalleeParam$1, `number`);
const a = x * 1;
const b = y * 1;
const tmpBinBothLhs$1 = ``;
const tmpBinBothRhs$1 = $coerce(a, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = $coerce(tmpBinLhs$1, `plustr`);
const tmpBinBothRhs = $coerce(b, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let tmpCalleeParam$3 = $coerce(tmpBinLhs, `plustr`);
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, [1, 1]
 - 2: '$spy[1].valueOf()', 1
 - 3: 'Creating spy', 2, 1, [2, 2]
 - 4: '$spy[2].valueOf()', 2
 - 5: '12'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
