# Preval test case

# classic.md

> Self assign > Closure > Array closures > Classic

This has a gnarly expando-cache pattern. The sealer is aliased and that is called repetitively so the closure is moot.

## Options

- skipEval

## Input

`````js filename=intro
{
  const xpandofunc /*:()=>undefined*/ = function() {
    debugger;
    $(`PASS xpando func`);
    return undefined;
  };
  let self_closing_decoder /*:(unknown, unknown)=>unknown*/ = function($$0, $$1) {
    const $dlr_$$0 /*:unknown*/ = $$0;
    const $dlr_$$1 /*:unknown*/ = $$1;
    debugger;
    const $dlr_$$9 /*:unknown*/ = $dlr_$$0;
    const $dlr_$$11 /*:unknown*/ = $dlr_$$1;
    let thisclosurebecomesargumentsobj /*:unknown*/ = $dlr_$$0;
    self_closing_decoder = function($$0, $$1) {
      const tmpPrevalAliasArgumentsAny /*:arguments*/ = arguments;
      const $dlr_$$2 /*:unknown*/ = $$0;
      const $dlr_$$4 /*:unknown*/ = $$1;
      debugger;
      const $dlr_$$13 /*:unknown*/ = $dlr_$$2;
      const silly_compute /*:number*/ = $dlr_$$2 - 439;
      const next_data /*:primitive*/ = data_arr[silly_compute];
      const tmpBinLhs /*:unknown*/ = self_closing_decoder.SSEYog;
      const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
      if (tmpIfTest) {
        self_closing_decoder.SrLeQr = xpandofunc;
        thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
        const tmpAssignMemLhsObj /*:unknown*/ = self_closing_decoder;
        tmpAssignMemLhsObj.SSEYog = true;
      } else {}
      const zxTUZrtMJr /*:primitive*/ = data_arr[0];
      const SwPwsvZafKnIEsHOu$mUB /*:primitive*/ = silly_compute + zxTUZrtMJr;
      const cLbnPHF__jFdQ /*:unknown*/ = thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB];
      if (cLbnPHF__jFdQ) {
        return cLbnPHF__jFdQ;
      } else {
        const tmpBinLhs$7 /*:unknown*/ = self_closing_decoder.AHFoHa;
        const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$7 === undefined;
        if (tmpIfTest$1) {
          const tmpAssignMemLhsObj$1 /*:unknown*/ = self_closing_decoder;
          tmpAssignMemLhsObj$1.AHFoHa = true;
        } else {}
        const tmpMCF$13 /*:unknown*/ = self_closing_decoder.SrLeQr;
        const tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC /*:unknown*/ = $dotCall(tmpMCF$13, self_closing_decoder, `SrLeQr`, next_data);
        thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB] = tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
        return tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
      }
    };
    const tmpReturnArg /*:unknown*/ = self_closing_decoder(thisclosurebecomesargumentsobj, $dlr_$$1);
    return tmpReturnArg;
  };
  const data_arr /*:array*/ = [
    `randomdata1`,
    `randomdata2`,
    `randomdata3`,
    `randomdata4`,
    `randomdata5`,
    `randomdata6`,
  ];
  const data_decoder /*:unknown*/ = self_closing_decoder;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    try {
      const tmpCalleeParam$145 /*:unknown*/ = data_decoder(477);
      const tmpUnaryArg$71 /*:number*/ = $Number_parseFloat(tmpCalleeParam$145);
      if (tmpUnaryArg$71) {
        break;
      } else {
        const tmpMCP$29 /*:primitive*/ = $dotCall($array_shift, data_arr, `shift`);
        $dotCall($array_push, data_arr, `push`, tmpMCP$29);
      }
    } catch (QEAWyhaEewZMjiEhuv_uVRbg$11) {
      const tmpMCP$31 /*:primitive*/ = $dotCall($array_shift, data_arr, `shift`);
      $dotCall($array_push, data_arr, `push`, tmpMCP$31);
    }
  }
  const tmpCalleeParam$53 /*:unknown*/ = data_decoder(467);
  $(tmpCalleeParam$53);
  $(data_arr);
}
`````


## Settled


`````js filename=intro
const xpandofunc /*:()=>undefined*/ = function () {
  debugger;
  $(`PASS xpando func`);
  return undefined;
};
let self_closing_decoder /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  const $dlr_$$1 /*:unknown*/ = $$1;
  debugger;
  self_closing_decoder = function ($$0, $$1 /*uses arguments*/) {
    const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ /*truthy*/ = arguments;
    const $dlr_$$6 /*:unknown*/ = $$0;
    debugger;
    let thisclosurebecomesargumentsobj /*:unknown*/ /*ternaryConst*/ = $dlr_$$0;
    const silly_compute /*:number*/ = $dlr_$$6 - 439;
    const next_data /*:primitive*/ = data_arr[silly_compute];
    const tmpBinLhs /*:unknown*/ = self_closing_decoder.SSEYog;
    const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
    if (tmpIfTest) {
      self_closing_decoder.SrLeQr = xpandofunc;
      thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny$1;
      self_closing_decoder.SSEYog = true;
    } else {
    }
    const zxTUZrtMJr /*:primitive*/ = data_arr[0];
    const SwPwsvZafKnIEsHOu$mUB /*:primitive*/ = silly_compute + zxTUZrtMJr;
    const cLbnPHF__jFdQ /*:unknown*/ = thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB];
    if (cLbnPHF__jFdQ) {
      return cLbnPHF__jFdQ;
    } else {
      const tmpBinLhs$7 /*:unknown*/ = self_closing_decoder.AHFoHa;
      const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$7 === undefined;
      if (tmpIfTest$1) {
        self_closing_decoder.AHFoHa = true;
      } else {
      }
      const tmpMCF$13 /*:unknown*/ = self_closing_decoder.SrLeQr;
      const tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC /*:unknown*/ = $dotCall(tmpMCF$13, self_closing_decoder, `SrLeQr`, next_data);
      thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB] = tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
      return tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
    }
  };
  const tmpReturnArg /*:unknown*/ = self_closing_decoder($dlr_$$0, $dlr_$$1);
  return tmpReturnArg;
};
const data_arr /*:array*/ /*truthy*/ = [`randomdata1`, `randomdata2`, `randomdata3`, `randomdata4`, `randomdata5`, `randomdata6`];
const data_decoder /*:function*/ /*truthy*/ = self_closing_decoder;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam$145 /*:unknown*/ = data_decoder(477);
    const tmpUnaryArg$71 /*:number*/ = $Number_parseFloat(tmpCalleeParam$145);
    if (tmpUnaryArg$71) {
      break;
    } else {
      const tmpMCP$29 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, data_arr, `shift`);
      $dotCall($array_push, data_arr, `push`, tmpMCP$29);
    }
  } catch (QEAWyhaEewZMjiEhuv_uVRbg$11) {
    const tmpMCP$31 /*:unknown*/ /*truthy*/ = $dotCall($array_shift, data_arr, `shift`);
    $dotCall($array_push, data_arr, `push`, tmpMCP$31);
  }
}
const tmpCalleeParam$53 /*:unknown*/ = data_decoder(467);
$(tmpCalleeParam$53);
$(data_arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const xpandofunc = function () {
  $(`PASS xpando func`);
};
let self_closing_decoder = function ($dlr_$$0, $dlr_$$1) {
  self_closing_decoder = function ($dlr_$$6, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let thisclosurebecomesargumentsobj = $dlr_$$0;
    const silly_compute = $dlr_$$6 - 439;
    const next_data = data_arr[silly_compute];
    if (self_closing_decoder.SSEYog === undefined) {
      self_closing_decoder.SrLeQr = xpandofunc;
      thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny$1;
      self_closing_decoder.SSEYog = true;
    }
    const SwPwsvZafKnIEsHOu$mUB = silly_compute + data_arr[0];
    const cLbnPHF__jFdQ = thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB];
    if (cLbnPHF__jFdQ) {
      return cLbnPHF__jFdQ;
    } else {
      if (self_closing_decoder.AHFoHa === undefined) {
        self_closing_decoder.AHFoHa = true;
      }
      const tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC = self_closing_decoder.SrLeQr(next_data);
      thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB] = tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
      return tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
    }
  };
  const tmpReturnArg = self_closing_decoder($dlr_$$0, $dlr_$$1);
  return tmpReturnArg;
};
const data_arr = [`randomdata1`, `randomdata2`, `randomdata3`, `randomdata4`, `randomdata5`, `randomdata6`];
const data_decoder = self_closing_decoder;
while (true) {
  try {
    if ($Number_parseFloat(data_decoder(477))) {
      break;
    } else {
      $dotCall($array_push, data_arr, `push`, $dotCall($array_shift, data_arr, `shift`));
    }
  } catch (QEAWyhaEewZMjiEhuv_uVRbg$11) {
    $dotCall($array_push, data_arr, `push`, $dotCall($array_shift, data_arr, `shift`));
  }
}
$(data_decoder(467));
$(data_arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "PASS xpando func" );
  return undefined;
};
let b = function($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  b = function($$0,$$1 ) {
    const e = f;
    const g = $$0;
    debugger;
    let h = c;
    const i = g - 439;
    const j = k[ i ];
    const l = b.SSEYog;
    const m = l === undefined;
    if (m) {
      b.SrLeQr = a;
      h = e;
      b.SSEYog = true;
    }
    const n = k[ 0 ];
    const o = i + n;
    const p = h[ o ];
    if (p) {
      return p;
    }
    else {
      const q = b.AHFoHa;
      const r = q === undefined;
      if (r) {
        b.AHFoHa = true;
      }
      const s = b.SrLeQr;
      const t = $dotCall( s, b, "SrLeQr", j );
      h[o] = t;
      return t;
    }
  };
  const u = b( c, d );
  return u;
};
const k = [ "randomdata1", "randomdata2", "randomdata3", "randomdata4", "randomdata5", "randomdata6" ];
const v = b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const w = v( 477 );
    const x = $Number_parseFloat( w );
    if (x) {
      break;
    }
    else {
      const y = $dotCall( $array_shift, k, "shift" );
      $dotCall( $array_push, k, "push", y );
    }
  }
  catch (z) {
    const ba = $dotCall( $array_shift, k, "shift" );
    $dotCall( $array_push, k, "push", ba );
  }
}
const bb = v( 467 );
$( bb );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const xpandofunc = function () {
  debugger;
  $(`PASS xpando func`);
  return undefined;
};
let self_closing_decoder = function ($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const $dlr_$$2 = $dlr_$$0;
  const $dlr_$$4 = $dlr_$$1;
  const $dlr_$$9 = $dlr_$$2;
  const $dlr_$$11 = $dlr_$$4;
  let thisclosurebecomesargumentsobj = $dlr_$$2;
  self_closing_decoder = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let $dlr_$$6 = $$0;
    let $dlr_$$8 = $$1;
    debugger;
    const tmpPrevalAliasArgumentsAny = tmpPrevalAliasArgumentsAny$1;
    const $dlr_$$10 = $dlr_$$6;
    const $dlr_$$12 = $dlr_$$8;
    const $dlr_$$13 = $dlr_$$10;
    const silly_compute = $dlr_$$10 - 439;
    const next_data = data_arr[silly_compute];
    const tmpBinLhs = self_closing_decoder.SSEYog;
    const tmpIfTest = tmpBinLhs === undefined;
    if (tmpIfTest) {
      self_closing_decoder.SrLeQr = xpandofunc;
      thisclosurebecomesargumentsobj = tmpPrevalAliasArgumentsAny;
      const tmpAssignMemLhsObj = self_closing_decoder;
      self_closing_decoder.SSEYog = true;
    } else {
    }
    const zxTUZrtMJr = data_arr[0];
    const SwPwsvZafKnIEsHOu$mUB = silly_compute + zxTUZrtMJr;
    const cLbnPHF__jFdQ = thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB];
    if (cLbnPHF__jFdQ) {
      return cLbnPHF__jFdQ;
    } else {
      const tmpBinLhs$7 = self_closing_decoder.AHFoHa;
      const tmpIfTest$1 = tmpBinLhs$7 === undefined;
      if (tmpIfTest$1) {
        const tmpAssignMemLhsObj$1 = self_closing_decoder;
        self_closing_decoder.AHFoHa = true;
      } else {
      }
      const tmpMCF$13 = self_closing_decoder.SrLeQr;
      const tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC = $dotCall(tmpMCF$13, self_closing_decoder, `SrLeQr`, next_data);
      thisclosurebecomesargumentsobj[SwPwsvZafKnIEsHOu$mUB] = tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
      return tmpClusterSSA_CBtdWW_KrAkfQZQbOhIfVC;
    }
  };
  const tmpReturnArg = self_closing_decoder(thisclosurebecomesargumentsobj, $dlr_$$4);
  return tmpReturnArg;
};
const data_arr = [`randomdata1`, `randomdata2`, `randomdata3`, `randomdata4`, `randomdata5`, `randomdata6`];
const data_decoder = self_closing_decoder;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  try {
    const tmpCalleeParam$145 = data_decoder(477);
    const tmpUnaryArg$71 = $Number_parseFloat(tmpCalleeParam$145);
    if (tmpUnaryArg$71) {
      break;
    } else {
      const tmpMCP$29 = $dotCall($array_shift, data_arr, `shift`);
      $dotCall($array_push, data_arr, `push`, tmpMCP$29);
    }
  } catch (QEAWyhaEewZMjiEhuv_uVRbg$11) {
    const tmpMCP$31 = $dotCall($array_shift, data_arr, `shift`);
    $dotCall($array_push, data_arr, `push`, tmpMCP$31);
  }
}
const tmpCalleeParam$53 = data_decoder(467);
$(tmpCalleeParam$53);
$(data_arr);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) can try-escaping support this expr node type? CallExpression
- (todo) self assign simple case but with inner arguments
- (todo) self-closing pattern when inner access arguments/this needs refinement
- (todo) type trackeed tricks can possibly support static $Number_parseFloat


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
