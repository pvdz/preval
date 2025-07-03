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
  const b /*:number*/ = y$1 * 1;
  const tmpRet /*:string*/ = `${a}${b}`;
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
  const a = x$1 * 1;
  const b = y$1 * 1;
  const tmpRet = `${a}${b}`;
  return tmpRet;
};
const x = Number($spy(1));
$(tmpFree(x, Number($spy(2))));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c * 1;
  const f = d * 1;
  const g = `${e}${f}`;
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


- (todo) find test case where template ends up with multiple expressions


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
