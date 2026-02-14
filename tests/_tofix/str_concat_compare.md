# Preval test case

# plus_vs_tpl6.md

> Normalize > Compound > Plus vs tpl6
>
> 'a'+str === 'a'+str2 is same as str === str2

## Input

`````js filename=intro
const spy /*:unknown*/ = $spy(`woop`);
const tmpStringConcatL /*:string*/ = $coerce(spy, `plustr`);
const tmpStringConcatL$1 /*:string*/ = $coerce(spy, `string`);
const tmpBinBothLhs /*:string*/ /*truthy*/ = `a${tmpStringConcatL}`;
const tmpBinBothRhs /*:string*/ /*truthy*/ = `a${tmpStringConcatL$1}`;
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>boolean*/ = function $free($$0, $$1) {
  const tmpStringConcatL$2 /*:string*/ = $$0;
  const tmpStringConcatL$4 /*:string*/ = $$1;
  debugger;
  const tmpBinBothLhs /*:string*/ /*truthy*/ = `a${tmpStringConcatL$2}`;
  const tmpBinBothRhs /*:string*/ /*truthy*/ = `a${tmpStringConcatL$4}`;
  const tmpRet /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
  return tmpRet;
};
const spy /*:unknown*/ = $spy(`woop`);
const tmpStringConcatL /*:string*/ = $coerce(spy, `plustr`);
const tmpStringConcatL$1 /*:string*/ = $coerce(spy, `string`);
const tmpCalleeParam /*:boolean*/ = $frfr(tmpFree, tmpStringConcatL, tmpStringConcatL$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpStringConcatL$2, tmpStringConcatL$4) {
  const tmpRet = `a${tmpStringConcatL$2}` === `a${tmpStringConcatL$4}`;
  return tmpRet;
};
const spy = $spy(`woop`);
const tmpStringConcatL = spy + ``;
$(tmpFree(tmpStringConcatL, String(spy)));
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
const tmpStringConcatL = $coerce(spy, `plustr`);
const tmpStringConcatL$1 = $coerce(spy, `string`);
const tmpBinBothLhs$1 = `a`;
const tmpBinBothRhs$1 = $coerce(tmpStringConcatL, `string`);
const tmpBinLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothLhs = $coerce(tmpBinLhs, `plustr`);
const tmpBinBothLhs$3 = `a`;
const tmpBinBothRhs$3 = $coerce(tmpStringConcatL$1, `string`);
const tmpBinLhs$1 = tmpBinBothLhs$3 + tmpBinBothRhs$3;
const tmpBinBothRhs = $coerce(tmpBinLhs$1, `plustr`);
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
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
