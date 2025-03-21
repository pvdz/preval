# Preval test case

# plus_vs_tpl2.md

> Normalize > Compound > Plus vs tpl2
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
const spy = {
  valueOf(){ return 'a'; },
  toString(){ return 'b'; },
};
$('a' + spy === `a${spy}`);

`````


## Settled


`````js filename=intro
const tmpFree /*:(string, string)=>boolean*/ = function $free($$0, $$1) {
  const tmpBinBothRhs$2 /*:string*/ = $$0;
  const tmpStringConcatL$1 /*:string*/ = $$1;
  debugger;
  const tmpBinBothLhs /*:string*/ = `a${tmpStringConcatL$1}`;
  const tmpBinLhs /*:string*/ = `a${tmpBinBothRhs$2}`;
  const tmpRet /*:boolean*/ = tmpBinBothLhs === tmpBinLhs;
  return tmpRet;
};
const spy /*:object*/ = {
  valueOf() {
    debugger;
    return `a`;
  },
  toString() {
    debugger;
    return `b`;
  },
};
const tmpStringConcatL /*:string*/ = $coerce(spy, `plustr`);
const tmpBinBothRhs$1 /*:string*/ = $coerce(spy, `string`);
const tmpCalleeParam /*:boolean*/ = $frfr(tmpFree, tmpBinBothRhs$1, tmpStringConcatL);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free(tmpBinBothRhs$2, tmpStringConcatL$1) {
  const tmpRet = `a${tmpStringConcatL$1}` === `a${tmpBinBothRhs$2}`;
  return tmpRet;
};
const spy = {
  valueOf() {
    return `a`;
  },
  toString() {
    return `b`;
  },
};
const tmpStringConcatL = $coerce(spy, `plustr`);
$($frfr(tmpFree, $coerce(spy, `string`), tmpStringConcatL));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = `a${d}`;
  const f = `a${c}`;
  const g = e === f;
  return g;
};
const h = {
  valueOf(  ) {
    debugger;
    return "a";
  },
  toString(  ) {
    debugger;
    return "b";
  },
};
const i = $coerce( h, "plustr" );
const j = $coerce( h, "string" );
const k = l( a, j, i );
$( k );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
