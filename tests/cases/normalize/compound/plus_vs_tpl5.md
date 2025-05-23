# Preval test case

# plus_vs_tpl5.md

> Normalize > Compound > Plus vs tpl5
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
const spy = $spy('woop');
$('a' + spy === `a${spy}`);

`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>boolean*/ = function $free($$0, $$1) {
  const tmpStringConcatL$1 /*:string*/ = $$0;
  const tmpBinBothRhs$2 /*:string*/ = $$1;
  debugger;
  const tmpBinBothLhs /*:string*/ = `a${tmpStringConcatL$1}`;
  const tmpBinBothRhs /*:string*/ = `a${tmpBinBothRhs$2}`;
  const tmpRet /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
  return tmpRet;
};
const spy /*:unknown*/ = $spy(`woop`);
const tmpStringConcatL /*:string*/ = $coerce(spy, `plustr`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(spy, `string`);
const tmpCalleeParam /*:boolean*/ = $frfr(tmpFree, tmpStringConcatL, tmpBinBothRhs$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpStringConcatL$1, tmpBinBothRhs$2) {
  const tmpRet = `a${tmpStringConcatL$1}` === `a${tmpBinBothRhs$2}`;
  return tmpRet;
};
const spy = $spy(`woop`);
const tmpStringConcatL = $coerce(spy, `plustr`);
$($frfr(tmpFree, tmpStringConcatL, $coerce(spy, `string`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = `a${c}`;
  const f = `a${d}`;
  const g = e === f;
  return g;
};
const h = $spy( "woop" );
const i = $coerce( h, "plustr" );
const j = $coerce( h, "string" );
const k = l( a, i, j );
$( k );
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
