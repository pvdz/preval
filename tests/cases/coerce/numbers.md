# Preval test case

# numbers.md

> Coerce > Numbers
>
>

## Input

`````js filename=intro
const a = Number($spy(1));
const b = Number($spy(2));
$(`${a}${b}`);
`````


## Settled


`````js filename=intro
const tmpFree$1 /*:(number, number)=>string*/ = function $free($$0, $$1) {
  const a$1 /*:number*/ = $$0;
  const b$1 /*:number*/ = $$1;
  debugger;
  const tmpBinBothRhs$1 /*:string*/ = $coerce(a$1, `string`);
  const tmpBinBothRhs /*:string*/ = $coerce(b$1, `string`);
  const tmpRet /*:string*/ = tmpBinBothRhs$1 + tmpBinBothRhs;
  return tmpRet;
};
const tmpCalleeParam /*:unknown*/ = $spy(1);
const a /*:number*/ = $coerce(tmpCalleeParam, `number`);
const tmpCalleeParam$1 /*:unknown*/ = $spy(2);
const b /*:number*/ = $coerce(tmpCalleeParam$1, `number`);
const tmpCalleeParam$3 /*:string*/ = $frfr(tmpFree$1, a, b);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$1 = function $free(a$1, b$1) {
  const tmpRet = $coerce(a$1, `string`) + $coerce(b$1, `string`);
  return tmpRet;
};
const a = $coerce($spy(1), `number`);
$($frfr(tmpFree$1, a, $coerce($spy(2), `number`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = $coerce( c, "string" );
  const f = $coerce( d, "string" );
  const g = e + f;
  return g;
};
const h = $spy( 1 );
const i = $coerce( h, "number" );
const j = $spy( 2 );
const k = $coerce( j, "number" );
const l = m( a, i, k );
$( l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $spy(1);
const a = $coerce(tmpCalleeParam, `number`);
let tmpCalleeParam$1 = $spy(2);
const b = $coerce(tmpCalleeParam$1, `number`);
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
