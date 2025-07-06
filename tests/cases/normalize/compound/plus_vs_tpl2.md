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
  const tmpBinBothLhs /*:string*/ /*truthy*/ = `a${tmpStringConcatL$1}`;
  const tmpBinBothRhs /*:string*/ /*truthy*/ = `a${tmpBinBothRhs$2}`;
  const tmpRet /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
  return tmpRet;
};
const spy /*:object*/ /*truthy*/ = {
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
const tmpStringConcatL = spy + ``;
$(tmpFree(String(spy), tmpStringConcatL));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1 ) {
  const b = $$0;
  const c = $$1;
  debugger;
  const d = `a${c}`;
  const e = `a${b}`;
  const f = d === e;
  return f;
};
const g = {
  valueOf(  ) {
    debugger;
    return "a";
  },
  toString(  ) {
    debugger;
    return "b";
  },
};
const h = $coerce( g, "plustr" );
const i = $coerce( g, "string" );
const j = k( a, i, h );
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    return `a`;
  },
  toString() {
    debugger;
    return `b`;
  },
};
const tmpStringConcatL = $coerce(spy, `plustr`);
const tmpBinBothLhs = `a${tmpStringConcatL}`;
const tmpBinBothLhs$1 = `a`;
const tmpBinBothRhs$1 = $coerce(spy, `string`);
const tmpBinLhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
const tmpBinBothRhs = $coerce(tmpBinLhs, `plustr`);
let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
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
