# Preval test case

# plus_vs_tpl6.md

> Normalize > Compound > Plus vs tpl6
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
const spy /*:unknown*/ = $spy(`woop`);
const a /*:string*/ = $coerce(spy, `plustr`);
const b /*:string*/ = $coerce(spy, `string`);
const x /*:string*/ /*truthy*/ = `a${a}`;
const y /*:string*/ /*truthy*/ = `a${b}`;
const z /*:boolean*/ = x === y;
$(z);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>boolean*/ = function $free($$0, $$1) {
  const a$1 /*:string*/ = $$0;
  const b$1 /*:string*/ = $$1;
  debugger;
  const x /*:string*/ /*truthy*/ = `a${a$1}`;
  const y /*:string*/ /*truthy*/ = `a${b$1}`;
  const tmpRet /*:boolean*/ = x === y;
  return tmpRet;
};
const spy /*:unknown*/ = $spy(`woop`);
const a /*:string*/ = $coerce(spy, `plustr`);
const b /*:string*/ = $coerce(spy, `string`);
const z /*:boolean*/ = $frfr(tmpFree, a, b);
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(a$1, b$1) {
  const tmpRet = `a${a$1}` === `a${b$1}`;
  return tmpRet;
};
const spy = $spy(`woop`);
const a = spy + ``;
$(tmpFree(a, String(spy)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = `a${b}`;
  const e = `a${c}`;
  const f = d === e;
  return f;
};
const g = $spy( "woop" );
const h = $coerce( g, "plustr" );
const i = $coerce( g, "string" );
const j = k( a, h, i );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const spy = $spy(`woop`);
const a = $coerce(spy, `plustr`);
const b = $coerce(spy, `string`);
const tmpBinBothLhs = `a`;
const tmpBinBothRhs = $coerce(a, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const x = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$1 = `a`;
const tmpBinBothRhs$1 = $coerce(b, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const y = $coerce(tmpBinLhs$1, `plustr`);
const z = x === y;
$(z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['woop', 'woop']
 - 2: '$spy[1].valueOf()', 'woop'
 - 3: '$spy[1].toString()', 'woop'
 - 4: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
