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
  const tmpMCF$5 /*:unknown*/ = tmpCallObj$3811.replace;
  const tmpCalleeParam$11085 /*:regex*/ = /^0./;
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
    let tmpClusterSSA_p$171 /*:string*/ = $frfr(tmpFree$1, $, $);
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$5467) {
        const tmpBinBothRhs$1 /*:string*/ = $frfr(tmpFree$1, $, $);
        tmpClusterSSA_p$171 = tmpClusterSSA_p$171 + tmpBinBothRhs$1;
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
  const tmpClusterSSA_r$2027 = tmpCallObj$3811.replace(/^0./, ``);
  $coerce(tmpBinBothRhs$32, `string`);
  $coerce(tmpClusterSSA_r$2027, `string`);
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
    let tmpClusterSSA_p$171 = $frfr(tmpFree$1, $, $);
    while (true) {
      if (tmpIfTest$5467) {
        tmpClusterSSA_p$171 = tmpClusterSSA_p$171 + $frfr(tmpFree$1, $, $);
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
const a = function b($$0,$$1 ) {
  const c = $$0;
  const d = $$1;
  debugger;
  const e = c + 71046;
  const f = $dotCall( $string_charCodeAt, "xyz", "charCodeAt", d );
  const g = e ^ f;
  const h = $String_fromCharCode( g );
  return h;
};
const i = function() {
  debugger;
  let j = tmpSSA_Tu();
  if (j) {
    tmpSSA_wu( j );
  }
  else {
    j = tmpSSA_Su();
    tmpSSA_wu( j );
  }
  if (j) {
    tmpSSA__u_t( j );
  }
  const k = tmpCallObj$3807.toString;
  $dotCall( k, tmpCallObj$3807, "toString", 36 );
  const l = tmpCallObj$3811.replace;
  const m = /^0./;
  const n = $dotCall( l, tmpCallObj$3811, "replace", m, "" );
  $coerce( tmpBinBothRhs$32, "string" );
  $coerce( n, "string" );
  const o = tmpSSA_Tu();
  if (o) {
    tmpClusterSSA_tmpssa3_c$245 = o;
  }
  else {
    const p = tmpSSA_Su();
    if (p) {
      tmpClusterSSA_tmpssa3_c$245 = p;
    }
  }
  if (tmpIfTest$5467) {
    let q = r( a, $, $ );
    while ($LOOP_UNROLL_10) {
      if (tmpIfTest$5467) {
        const s = r( a, $, $ );
        q = q + s;
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
$( i );
`````


## Todos triggered


- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) free with zero args, we can eliminate this?
- (todo) Support referencing this builtin in isFree: $
- (todo) - at least one of the frfr args was not isFree, bailing


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
