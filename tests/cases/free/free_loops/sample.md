# Preval test case

# sample.md

> Free > Free loops > Sample
>
> Subset of a real world case. When creating the test case, the loop was not getting free looped.

## Options

- skipEval

## Input

`````js filename=intro
const tmpFree = function $free(x) {
  const y = -x;
  const z = `${y}xyz`;
  return z;
};
const data_array = [`first`, `second`, `third`, `fourth`, `fifth`];
require(`cssesc`);                                            // this prevented freeloops from finding the type of the data array
const pkg = require(`failure`);                               // distraction for preval
while ($LOOP_NO_UNROLLS_LEFT) {
  const val = data_array[4];
  try {
    if ($frfr(tmpFree, val)) {
      break;
    } else {
      $dotCall($array_push, data_array, `push`, $dotCall($array_shift, data_array, `shift`));
    }
  } catch (_0x26e149$11) {
    $dotCall($array_push, data_array, `push`, $dotCall($array_shift, data_array, `shift`));
  }
}
const va = data_array[2];
$(va);

// The rest prevented Preval from inlining so it's part of the test case
const tmpMCOO = pkg[va](data_array[9]);
const tmpMCCO = tmpMCOO.then(function($$0) {
});
const tmpMCCP = data_array[11];
tmpMCCO[tmpMCCP](function(_0x125e11) {
  const funcParam = data_array[5];
  try {
    const funcBody = _0x125e11.response.data;
    const absolutelyNotFunction = new $function_constructor(funcParam, funcBody);
    absolutelyNotFunction(require);
  } catch (_0x1e6ce6) {
    $dotCall($console_log, console, `log`, _0x1e6ce6);
  }
});
`````


## Settled


`````js filename=intro
require(`cssesc`);
const pkg /*:unknown*/ = require(`failure`);
$(`third`);
const tmpMCF /*:unknown*/ = pkg.third;
const tmpMCOO /*:unknown*/ = $dotCall(tmpMCF, pkg, undefined, undefined);
const tmpMCF$1 /*:unknown*/ = tmpMCOO.then;
const tmpMCP$1 /*:(unused)=>undefined*/ = function $pcompiled($$0) {
  debugger;
  return undefined;
};
const tmpMCCO /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO, `then`, tmpMCP$1);
const tmpMCF$3 /*:unknown*/ = tmpMCCO.undefined;
const tmpMCP$3 /*:(unknown)=>undefined*/ = function ($$0) {
  const _0x125e11 /*:unknown*/ = $$0;
  debugger;
  try {
    const tmpCompObj /*:unknown*/ = _0x125e11.response;
    const funcBody /*:unknown*/ = tmpCompObj.data;
    const absolutelyNotFunction /*:function*/ /*truthy*/ = new $function_constructor(undefined, funcBody);
    absolutelyNotFunction(require);
  } catch (_0x1e6ce6) {
    $dotCall($console_log, console, `log`, _0x1e6ce6);
  }
  return undefined;
};
$dotCall(tmpMCF$3, tmpMCCO, undefined, tmpMCP$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
require(`cssesc`);
const pkg = require(`failure`);
$(`third`);
const tmpMCOO = pkg.third(undefined);
const tmpMCCO = tmpMCOO.then(function $pcompiled($$0) {});
tmpMCCO.undefined(function (_0x125e11) {
  try {
    const funcBody = _0x125e11.response.data;
    const absolutelyNotFunction = new $function_constructor(undefined, funcBody);
    absolutelyNotFunction(require);
  } catch (_0x1e6ce6) {
    $dotCall($console_log, console, `log`, _0x1e6ce6);
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
require( "cssesc" );
const a = require( "failure" );
$( "third" );
const b = a.third;
const c = $dotCall( b, a, undefined, undefined );
const d = c.then;
const e = function $pcompiled($$0 ) {
  debugger;
  return undefined;
};
const f = $dotCall( d, c, "then", e );
const g = f.undefined;
const h = function($$0 ) {
  const i = $$0;
  debugger;
  try {
    const j = i.response;
    const k = j.data;
    const l = new $function_constructor( undefined, k );
    l( require );
  }
  catch (m) {
    $dotCall( $console_log, console, "log", m );
  }
  return undefined;
};
$dotCall( g, f, undefined, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0) {
  let x = $$0;
  debugger;
  const y = -x;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $coerce(y, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
  const z = `${tmpStringConcatR}xyz`;
  return z;
};
const data_array = [`first`, `second`, `third`, `fourth`, `fifth`];
require(`cssesc`);
const pkg = require(`failure`);
while ($LOOP_NO_UNROLLS_LEFT) {
  const val = data_array[4];
  try {
    const tmpIfTest = $frfr(tmpFree, val);
    if (tmpIfTest) {
      break;
    } else {
      let tmpCalleeParam = $array_push;
      let tmpCalleeParam$1 = data_array;
      let tmpCalleeParam$3 = $dotCall($array_shift, data_array, `shift`);
      $dotCall(tmpCalleeParam, tmpCalleeParam$1, `push`, tmpCalleeParam$3);
    }
  } catch (_0x26e149$11) {
    let tmpCalleeParam$5 = $array_push;
    let tmpCalleeParam$7 = data_array;
    let tmpCalleeParam$9 = $dotCall($array_shift, data_array, `shift`);
    $dotCall(tmpCalleeParam$5, tmpCalleeParam$7, `push`, tmpCalleeParam$9);
  }
}
const va = data_array[2];
$(va);
const tmpMCF = pkg[va];
const tmpMCP = data_array[9];
const tmpMCOO = $dotCall(tmpMCF, pkg, undefined, tmpMCP);
const tmpMCF$1 = tmpMCOO.then;
const tmpMCP$1 = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  return undefined;
};
const tmpMCCO = $dotCall(tmpMCF$1, tmpMCOO, `then`, tmpMCP$1);
const tmpMCCP = data_array[11];
const tmpMCF$3 = tmpMCCO[tmpMCCP];
const tmpMCP$3 = function ($$0) {
  let _0x125e11 = $$0;
  debugger;
  const funcParam = data_array[5];
  try {
    const tmpCompObj = _0x125e11.response;
    const funcBody = tmpCompObj.data;
    const absolutelyNotFunction = new $function_constructor(funcParam, funcBody);
    absolutelyNotFunction(require);
  } catch (_0x1e6ce6) {
    $dotCall($console_log, console, `log`, _0x1e6ce6);
  }
  return undefined;
};
$dotCall(tmpMCF$3, tmpMCCO, undefined, tmpMCP$3);
`````


## Todos triggered


- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) VarStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
