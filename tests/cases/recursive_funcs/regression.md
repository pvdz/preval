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

## Pre Normal


`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const cs$1 = $dlr_$$0;
  const g$147 = $dlr_$$1;
  const tmpBinBothLhs$3633 = cs$1 + 71046;
  const tmpBinBothRhs$3633 = `xyz`.charCodeAt(g$147);
  const tmpCalleeParam$9457 = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpRet$1 = String.fromCharCode(tmpCalleeParam$9457);
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
  const tmpClusterSSA_e$2725 = tmpCallObj$3807.toString(36);
  const tmpCalleeParam$11085 = /^0./;
  const tmpClusterSSA_r$2027 = tmpCallObj$3811.replace(tmpCalleeParam$11085, ``);
  const tmpBinLhs$33 = `` + $coerce(tmpBinBothRhs$32, `string`) + `_` + $coerce(tmpClusterSSA_r$2027, `string`) + ``;
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

## Normalized


`````js filename=intro
const tmpFree$1 = function $free($$0, $$1) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  debugger;
  const cs$1 = $dlr_$$0;
  const g$147 = $dlr_$$1;
  const tmpBinBothLhs$3633 = cs$1 + 71046;
  const tmpBinBothRhs$3633 = `xyz`.charCodeAt(g$147);
  const tmpCalleeParam$9457 = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpRet$1 = String.fromCharCode(tmpCalleeParam$9457);
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
  const tmpClusterSSA_e$2725 = tmpCallObj$3807.toString(36);
  const tmpCalleeParam$11085 = /^0./;
  const tmpClusterSSA_r$2027 = tmpCallObj$3811.replace(tmpCalleeParam$11085, ``);
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

## Output


`````js filename=intro
const tmpFree$1 /*:(unknown, unknown)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$0 = $$0;
  const $dlr_$$1 = $$1;
  debugger;
  const tmpBinBothLhs$3633 /*:primitive*/ = $dlr_$$0 + 71046;
  const tmpBinBothRhs$3633 /*:number*/ = `xyz`.charCodeAt($dlr_$$1);
  const tmpCalleeParam$9457 /*:number*/ = tmpBinBothLhs$3633 ^ tmpBinBothRhs$3633;
  const tmpRet$1 /*:string*/ = String.fromCharCode(tmpCalleeParam$9457);
  return tmpRet$1;
};
const tmpObjLitVal$159 /*:()=>undefined*/ = function () {
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
  tmpCallObj$3807.toString(36);
  const tmpCalleeParam$11085 /*:regex*/ = /^0./;
  const tmpClusterSSA_r$2027 = tmpCallObj$3811.replace(tmpCalleeParam$11085, ``);
  $coerce(tmpBinBothRhs$32, `string`);
  $coerce(tmpClusterSSA_r$2027, `string`);
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
  if (tmpIfTest$5467) {
    let tmpClusterSSA_p$171 /*:primitive*/ = $frfr(tmpFree$1, $, $);
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

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  const g = c + 71046;
  const h = "xyz".charCodeAt( e );
  const i = g ^ h;
  const j = String.fromCharCode( i );
  return j;
};
const k = function() {
  debugger;
  let l = tmpSSA_Tu();
  if (l) {
    tmpSSA_wu( l );
  }
  else {
    l = tmpSSA_Su();
    tmpSSA_wu( l );
  }
  if (l) {
    tmpSSA__u_t( l );
  }
  tmpCallObj$3807.toString( 36 );
  const m = /^0./;
  const n = tmpCallObj$3811.replace( m, "" );
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
$( k );
`````

## Globals

BAD@! Found 9 implicit global bindings:

tmpSSA_Tu, tmpSSA_wu, tmpSSA_Su, tmpSSA__u_t, tmpCallObj$3807, tmpCallObj$3811, tmpBinBothRhs$32, tmpClusterSSA_tmpssa3_c$245, tmpIfTest$5467

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
