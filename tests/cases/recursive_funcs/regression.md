# Preval test case

# regression.md

> Recursive funcs > Regression
>
> This was a "minimal" test case to catch a bug in recursive funcs
> It accidentally achieved the prefix issue of a funcChain `1,5` being 
> a prefix of `1,53`, which would be an incorrect match but it needs a 
> delimiting comma to show `1,5,` is not a prefix of `1,53,` .

## Input

`````js filename=intro
const tmpFree$1/*:(unknown, number)=>string*/ = function $free($$0, $$1) {
  const cs$1 = $$0;
  const g$147/*:number*/ = $$1;
  debugger;
  const tmpBinBothLhs$3633/*:primitive*/ = cs$1 + 71046;
  const tmpBinBothRhs$3633/*:number*/ = `xyz`.charCodeAt(g$147);
  const tmpCalleeParam$9457/*:number*/ = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpRet$1/*:string*/ = String.fromCharCode(tmpCalleeParam$9457);
  return tmpRet$1;
};
const tmpObjLitVal$159/*:(unknown, unknown, unknown)=>undefined*/ = function() {
  let t$3391 = tmpSSA_Tu();
  if (t$3391) {
    tmpSSA_wu(t$3391);
  } else {
    t$3391 = tmpSSA_Su();
    tmpSSA_wu(t$3391);
  }
  if (t$3391) {
    tmpSSA__u_t(t$3391);
  } else {

  }
  const tmpClusterSSA_e$2725 = tmpCallObj$3807.toString(36);
  const tmpCalleeParam$11085/*:regex*/ = /^0./;
  const tmpClusterSSA_r$2027/*:string*/ = tmpCallObj$3811.replace(tmpCalleeParam$11085, ``);
  const tmpBinLhs$33/*:string*/ = `${tmpBinBothRhs$32}_${tmpClusterSSA_r$2027}`;
  const tmpClusterSSA_t$9 = tmpSSA_Tu();
  if (tmpClusterSSA_t$9) {
    tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$9;
  } else {
    const tmpClusterSSA_t$11 = tmpSSA_Su();
    if (tmpClusterSSA_t$11) {
      tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$11;
    } else {

    }
  }
  let p$171/*:string*/ = ``;
  let g$1/*:number*/ = 0;
  while (true) {
    if (tmpIfTest$5467) {
      const tmpBinBothRhs$3631/*:string*/ = $frfr(tmpFree$1, $, $);
      p$171 = p$171 + tmpBinBothRhs$3631;
    } else {
      break;
    }
  }
  return undefined;
};

$(tmpObjLitVal$159);
`````


## Settled


`````js filename=intro
const tmpFree /*:()=>string*/ = function $free() {
  debugger;
  const tmpBinBothRhs$3631 /*:string*/ = $frfr(tmpFree$1, $, $);
  const tmpRet /*:string*/ = `${tmpBinBothRhs$3631}`;
  return tmpRet;
};
const tmpFree$1 /*:(unknown, unknown)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$0 /*:unknown*/ = $$0;
  const $dlr_$$1 /*:unknown*/ = $$1;
  debugger;
  const tmpBinBothLhs$3633 /*:primitive*/ = $dlr_$$0 + 71046;
  const tmpBinBothRhs$3633 /*:number*/ = $dotCall($string_charCodeAt, `xyz`, `charCodeAt`, $dlr_$$1);
  const tmpCalleeParam$9457 /*:number*/ = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpRet$1 /*:string*/ = $String_fromCharCode(tmpCalleeParam$9457);
  return tmpRet$1;
};
const tmpObjLitVal$159 /*:()=>undefined*/ = function () {
  debugger;
  let t$3391 /*:unknown*/ = tmpSSA_Tu();
  if (t$3391) {
    tmpSSA_wu(t$3391);
  } else {
    t$3391 = tmpSSA_Su();
    tmpSSA_wu(t$3391);
  }
  if (t$3391) {
    tmpSSA__u_t(t$3391);
  } else {
  }
  const tmpMCF$3 /*:unknown*/ = tmpCallObj$3807.toString;
  $dotCall(tmpMCF$3, tmpCallObj$3807, `toString`, 36);
  const tmpCalleeParam$11085 /*:regex*/ /*truthy*/ = new $regex_constructor(`^0.`, ``);
  const tmpMCF$5 /*:unknown*/ = tmpCallObj$3811.replace;
  const tmpClusterSSA_r$2027 /*:unknown*/ = $dotCall(tmpMCF$5, tmpCallObj$3811, `replace`, tmpCalleeParam$11085, ``);
  $coerce(tmpBinBothRhs$32, `string`);
  $coerce(tmpClusterSSA_r$2027, `string`);
  const tmpClusterSSA_t$9 /*:unknown*/ = tmpSSA_Tu();
  if (tmpClusterSSA_t$9) {
    tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$9;
  } else {
    const tmpClusterSSA_t$11 /*:unknown*/ = tmpSSA_Su();
    if (tmpClusterSSA_t$11) {
      tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$11;
    } else {
    }
  }
  if (tmpIfTest$5467) {
    let tmpClusterSSA_p$171 /*:string*/ = $frfr(tmpFree);
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$5467) {
        const tmpBinBothRhs$1 /*:string*/ = $frfr(tmpFree$1, $, $);
        tmpClusterSSA_p$171 = `${tmpClusterSSA_p$171}${tmpBinBothRhs$1}`;
      } else {
        break;
      }
    }
    return undefined;
  } else {
    return undefined;
  }
};
$(tmpObjLitVal$159);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free() {
  const tmpBinBothRhs$3631 = tmpFree$1($, $);
  const tmpRet = `${tmpBinBothRhs$3631}`;
  return tmpRet;
};
const tmpFree$1 = function $free($dlr_$$0, $dlr_$$1) {
  const tmpBinBothLhs$3633 = $dlr_$$0 + 71046;
  const tmpRet$1 = $String_fromCharCode(tmpBinBothLhs$3633 ^ $dotCall($string_charCodeAt, `xyz`, `charCodeAt`, $dlr_$$1));
  return tmpRet$1;
};
$(function () {
  let t$3391 = tmpSSA_Tu();
  if (t$3391) {
    tmpSSA_wu(t$3391);
  } else {
    t$3391 = tmpSSA_Su();
    tmpSSA_wu(t$3391);
  }
  if (t$3391) {
    tmpSSA__u_t(t$3391);
  }
  tmpCallObj$3807.toString(36);
  const tmpClusterSSA_r$2027 = tmpCallObj$3811.replace(new $regex_constructor(`^0.`, ``), ``);
  String(tmpBinBothRhs$32);
  String(tmpClusterSSA_r$2027);
  const tmpClusterSSA_t$9 = tmpSSA_Tu();
  if (tmpClusterSSA_t$9) {
    tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$9;
  } else {
    const tmpClusterSSA_t$11 = tmpSSA_Su();
    if (tmpClusterSSA_t$11) {
      tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$11;
    }
  }
  if (tmpIfTest$5467) {
    let tmpClusterSSA_p$171 = tmpFree();
    while (true) {
      if (tmpIfTest$5467) {
        const tmpBinBothRhs$1 = tmpFree$1($, $);
        tmpClusterSSA_p$171 = `${tmpClusterSSA_p$171}${tmpBinBothRhs$1}`;
      } else {
        break;
      }
    }
  }
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b() {
  debugger;
  const c = d( e, $, $ );
  const f = `${c}`;
  return f;
};
const e = function b($$0,$$1 ) {
  const g = $$0;
  const h = $$1;
  debugger;
  const i = g + 71046;
  const j = $dotCall( $string_charCodeAt, "xyz", "charCodeAt", h );
  const k = i ^ j;
  const l = $String_fromCharCode( k );
  return l;
};
const m = function() {
  debugger;
  let n = tmpSSA_Tu();
  if (n) {
    tmpSSA_wu( n );
  }
  else {
    n = tmpSSA_Su();
    tmpSSA_wu( n );
  }
  if (n) {
    tmpSSA__u_t( n );
  }
  const o = tmpCallObj$3807.toString;
  $dotCall( o, tmpCallObj$3807, "toString", 36 );
  const p = new $regex_constructor( "^0.", "" );
  const q = tmpCallObj$3811.replace;
  const r = $dotCall( q, tmpCallObj$3811, "replace", p, "" );
  $coerce( tmpBinBothRhs$32, "string" );
  $coerce( r, "string" );
  const s = tmpSSA_Tu();
  if (s) {
    tmpClusterSSA_tmpssa3_c$245 = s;
  }
  else {
    const t = tmpSSA_Su();
    if (t) {
      tmpClusterSSA_tmpssa3_c$245 = t;
    }
  }
  if (tmpIfTest$5467) {
    let u = d( a );
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$5467) {
        const v = d( e, $, $ );
        u = `${u}${v}`;
      }
      else {
        break;
      }
    }
    return undefined;
  }
  else {
    return undefined;
  }
};
$( m );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const cs$1 = $dlr_$$0;
  const g$147 = $dlr_$$1;
  const tmpBinBothLhs$3633 = cs$1 + 71046;
  const tmpMCF = $string_charCodeAt;
  const tmpBinBothRhs$3633 = $dotCall($string_charCodeAt, `xyz`, `charCodeAt`, g$147);
  const tmpCalleeParam$9457 = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpMCF$1 = $String_fromCharCode;
  const tmpRet$1 = $String_fromCharCode(tmpCalleeParam$9457);
  return tmpRet$1;
};
const tmpObjLitVal$159 = function () {
  debugger;
  let t$3391 = tmpSSA_Tu();
  if (t$3391) {
    tmpSSA_wu(t$3391);
  } else {
    t$3391 = tmpSSA_Su();
    tmpSSA_wu(t$3391);
  }
  if (t$3391) {
    tmpSSA__u_t(t$3391);
  } else {
  }
  const tmpMCF$3 = tmpCallObj$3807.toString;
  const tmpClusterSSA_e$2725 = $dotCall(tmpMCF$3, tmpCallObj$3807, `toString`, 36);
  const tmpCalleeParam$11085 = new $regex_constructor(`^0.`, ``);
  const tmpMCF$5 = tmpCallObj$3811.replace;
  const tmpClusterSSA_r$2027 = $dotCall(tmpMCF$5, tmpCallObj$3811, `replace`, tmpCalleeParam$11085, ``);
  const tmpBinBothLhs$1 = ``;
  const tmpBinBothRhs$1 = $coerce(tmpBinBothRhs$32, `string`);
  const tmpBinLhs$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
  const tmpStringConcatR = $coerce(tmpBinLhs$1, `plustr`);
  const tmpBinBothLhs = `${tmpStringConcatR}_`;
  const tmpBinBothRhs = $coerce(tmpClusterSSA_r$2027, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpBinLhs$33 = $coerce(tmpBinLhs, `plustr`);
  const tmpClusterSSA_t$9 = tmpSSA_Tu();
  if (tmpClusterSSA_t$9) {
    tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$9;
  } else {
    const tmpClusterSSA_t$11 = tmpSSA_Su();
    if (tmpClusterSSA_t$11) {
      tmpClusterSSA_tmpssa3_c$245 = tmpClusterSSA_t$11;
    } else {
    }
  }
  let p$171 = ``;
  let g$1 = 0;
  while (true) {
    if (tmpIfTest$5467) {
      const tmpBinBothRhs$3631 = $frfr(tmpFree$1, $, $);
      p$171 = p$171 + tmpBinBothRhs$3631;
    } else {
      break;
    }
  }
  return undefined;
};
$(tmpObjLitVal$159);
`````


## Todos triggered


- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) Support this node type in isFree: TemplateLiteral
- (todo) find test case where template ends up with multiple expressions
- (todo) free with zero args, we can eliminate this?


## Globals


BAD@! Found 9 implicit global bindings:

tmpSSA_Tu, tmpSSA_wu, tmpSSA_Su, tmpSSA__u_t, tmpCallObj$3807, tmpCallObj$3811, tmpBinBothRhs$32, tmpClusterSSA_tmpssa3_c$245, tmpIfTest$5467


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
