# Preval test case

# bad_free.md

> Free > Free loops > Bad free

Random stuff that broke

## Input

`````js filename=intro
const tmpFree$1 = function $free(cs$1, g$147) {
  const tmpBinBothLhs$3633/*:primitive*/ = cs$1 + 71046;
  const tmpBinBothRhs$3633/*:number*/ = ``.charCodeAt(g$147);
  const tmpCalleeParam$9457/*:number*/ = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  return tmpCalleeParam$9457;
};
$(tmpFree$1);
const tmpObjLitVal$159 = function() {
  `${tmpBinBothRhs$32}_${tmpClusterSSA_r$2027}`;
  while (true) {
    const tmpBinBothRhs$3631/*:string*/ = $frfr(tmpFree$1, $, $);
    p$171 = p$171 + tmpBinBothRhs$3631;
  }
  return undefined;
};

$(tmpObjLitVal$159);
`````

## Pre Normal


`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let cs$1 = $$0;
  let g$147 = $$1;
  debugger;
  const tmpBinBothLhs$3633 = cs$1 + 71046;
  const tmpBinBothRhs$3633 = `\uf051`.charCodeAt(g$147);
  const tmpCalleeParam$9457 = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  return tmpCalleeParam$9457;
};
$(tmpFree$1);
const tmpObjLitVal$159 = function () {
  debugger;
  `` + $coerce(tmpBinBothRhs$32, `string`) + `_` + $coerce(tmpClusterSSA_r$2027, `string`) + ``;
  while (true) {
    const tmpBinBothRhs$3631 = $frfr(tmpFree$1, $, $);
    p$171 = p$171 + tmpBinBothRhs$3631;
  }
  return undefined;
};
$(tmpObjLitVal$159);
`````

## Normalized


`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let cs$1 = $$0;
  let g$147 = $$1;
  debugger;
  const tmpBinBothLhs$3633 = cs$1 + 71046;
  const tmpBinBothRhs$3633 = `\uf051`.charCodeAt(g$147);
  const tmpCalleeParam$9457 = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  return tmpCalleeParam$9457;
};
$(tmpFree$1);
const tmpObjLitVal$159 = function () {
  debugger;
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(tmpBinBothRhs$32, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
  const tmpBinBothLhs = `${tmpStringConcatR}_`;
  const tmpBinBothRhs = $coerce(tmpClusterSSA_r$2027, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  $coerce(tmpBinLhs, `plustr`);
  while (true) {
    const tmpBinBothRhs$3631 = $frfr(tmpFree$1, $, $);
    p$171 = p$171 + tmpBinBothRhs$3631;
  }
  return undefined;
};
$(tmpObjLitVal$159);
`````

## Output


`````js filename=intro
const tmpFree$1 /*:(unknown, unknown)=>number*/ = function $free($$0, $$1) {
  const cs$1 /*:unknown*/ = $$0;
  const g$147 /*:unknown*/ = $$1;
  debugger;
  const tmpBinBothLhs$3633 /*:primitive*/ = cs$1 + 71046;
  const tmpBinBothRhs$3633 /*:number*/ = `\uf051`.charCodeAt(g$147);
  const tmpCalleeParam$9457 /*:number*/ = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  return tmpCalleeParam$9457;
};
$(tmpFree$1);
const tmpObjLitVal$159 /*:()=>undefined*/ = function () {
  debugger;
  $coerce(tmpBinBothRhs$32, `string`);
  $coerce(tmpClusterSSA_r$2027, `string`);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpBinBothRhs$3631 /*:number*/ = $frfr(tmpFree$1, $, $);
    p$171 = p$171 + tmpBinBothRhs$3631;
  }
  return undefined;
};
$(tmpObjLitVal$159);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c + 71046;
  const f = "\uf051".charCodeAt( d );
  const g = e ^ f;
  return g;
};
$( a );
const h = function() {
  debugger;
  $coerce( tmpBinBothRhs$32, "string" );
  $coerce( tmpClusterSSA_r$2027, "string" );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const i = j( a, $, $ );
    p$171 = p$171 + i;
  }
  return undefined;
};
$( h );
`````

## Globals

BAD@! Found 3 implicit global bindings:

tmpBinBothRhs$32, tmpClusterSSA_r$2027, p$171

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $string_charCodeAt
- Support non-primitive in first arg to $coerce
- Support referencing this builtin in isFree: $
- - at least one of the frfr args was not isFree, bailing