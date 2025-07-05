# Preval test case

# arguments_parameter_shadowing_array_methods.md

> Arguments > Ai > Arguments parameter shadowing array methods
>
> Test parameter shadowing with array methods

## Input

`````js filename=intro
function testArgsParameterShadowingArrayMethods() {
  const mapResult = Array.prototype.map.call(arguments, x => x * 2);
  const filterResult = Array.prototype.filter.call(arguments, x => x > 2);
  const reduceResult = Array.prototype.reduce.call(arguments, (a, b) => a + b, 0);
  const sliceResult = Array.prototype.slice.call(arguments, 1, 3);
  $(mapResult, filterResult, reduceResult, sliceResult);
}

testArgsParameterShadowingArrayMethods(1, 2, 3, 4, 5);
`````


## Settled


`````js filename=intro
const testArgsParameterShadowingArrayMethods /*:()=>undefined*/ = function (/*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpLambdaMapLen /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  const tmpLambdaMapTest /*:boolean*/ = 0 < tmpLambdaMapLen;
  const tmpLambdaMapOut /*:array*/ /*truthy*/ = [];
  if (tmpLambdaMapTest) {
    const tmpLambdaMapHas /*:boolean*/ = 0 in tmpPrevalAliasArgumentsAny;
    if (tmpLambdaMapHas) {
      const tmpLambdaMapVal /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
      const tmpLambdaMapNow /*:number*/ = tmpLambdaMapVal * 2;
      tmpLambdaMapOut[0] = tmpLambdaMapNow;
    } else {
    }
    let tmpClusterSSA_tmpLambdaMapCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaMapTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen;
      if (tmpLambdaMapTest$1) {
        const tmpLambdaMapHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaMapCounter in tmpPrevalAliasArgumentsAny;
        if (tmpLambdaMapHas$1) {
          const tmpLambdaMapVal$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaMapCounter];
          const tmpLambdaMapNow$1 /*:number*/ = tmpLambdaMapVal$1 * 2;
          tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
        } else {
        }
        tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
      } else {
        break;
      }
    }
  } else {
  }
  tmpLambdaMapOut.length = tmpLambdaMapLen;
  const tmpLambdaFilterLen /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  const tmpLambdaFilterTest /*:boolean*/ = 0 < tmpLambdaFilterLen;
  const tmpLambdaFilterOut /*:array*/ /*truthy*/ = [];
  if (tmpLambdaFilterTest) {
    const tmpLambdaFilterHas /*:boolean*/ = 0 in tmpPrevalAliasArgumentsAny;
    if (tmpLambdaFilterHas) {
      const tmpLambdaFilterVal /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
      const tmpLambdaFilterWas /*:boolean*/ = tmpLambdaFilterVal > 2;
      if (tmpLambdaFilterWas) {
        $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal);
      } else {
      }
    } else {
    }
    let tmpClusterSSA_tmpLambdaFilterCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFilterTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFilterCounter < tmpLambdaFilterLen;
      if (tmpLambdaFilterTest$1) {
        const tmpLambdaFilterHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFilterCounter in tmpPrevalAliasArgumentsAny;
        if (tmpLambdaFilterHas$1) {
          const tmpLambdaFilterVal$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaFilterCounter];
          const tmpLambdaFilterWas$1 /*:boolean*/ = tmpLambdaFilterVal$1 > 2;
          if (tmpLambdaFilterWas$1) {
            $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
          } else {
          }
        } else {
        }
        tmpClusterSSA_tmpLambdaFilterCounter = tmpClusterSSA_tmpLambdaFilterCounter + 1;
      } else {
        break;
      }
    }
  } else {
  }
  const tmpLambdaReduceLen /*:unknown*/ = tmpPrevalAliasArgumentsAny.length;
  let tmpLambdaReduceOut /*:primitive*/ = 0;
  const tmpLambdaReduceTest /*:boolean*/ = 0 < tmpLambdaReduceLen;
  if (tmpLambdaReduceTest) {
    const tmpLambdaReduceHas /*:boolean*/ = 0 in tmpPrevalAliasArgumentsAny;
    if (tmpLambdaReduceHas) {
      const tmpLambdaReduceVal /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
      tmpLambdaReduceOut = 0 + tmpLambdaReduceVal;
    } else {
    }
    let tmpClusterSSA_tmpLambdaReduceCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaReduceTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen;
      if (tmpLambdaReduceTest$1) {
        const tmpLambdaReduceHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter in tmpPrevalAliasArgumentsAny;
        if (tmpLambdaReduceHas$1) {
          const tmpLambdaReduceVal$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaReduceCounter];
          tmpLambdaReduceOut = tmpLambdaReduceOut + tmpLambdaReduceVal$1;
        } else {
        }
        tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
      } else {
        break;
      }
    }
  } else {
  }
  const sliceResult /*:array*/ /*truthy*/ = $dotCall($array_slice, tmpPrevalAliasArgumentsAny, undefined, 1, 3);
  $(tmpLambdaMapOut, tmpLambdaFilterOut, tmpLambdaReduceOut, sliceResult);
  return undefined;
};
testArgsParameterShadowingArrayMethods(1, 2, 3, 4, 5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testArgsParameterShadowingArrayMethods = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpLambdaMapLen = tmpPrevalAliasArgumentsAny.length;
  const tmpLambdaMapTest = 0 < tmpLambdaMapLen;
  const tmpLambdaMapOut = [];
  if (tmpLambdaMapTest) {
    if (0 in tmpPrevalAliasArgumentsAny) {
      const tmpLambdaMapNow = tmpPrevalAliasArgumentsAny[0] * 2;
      tmpLambdaMapOut[0] = tmpLambdaMapNow;
    }
    let tmpClusterSSA_tmpLambdaMapCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaMapCounter < tmpLambdaMapLen) {
        if (tmpClusterSSA_tmpLambdaMapCounter in tmpPrevalAliasArgumentsAny) {
          const tmpLambdaMapNow$1 = tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaMapCounter] * 2;
          tmpLambdaMapOut[tmpClusterSSA_tmpLambdaMapCounter] = tmpLambdaMapNow$1;
        }
        tmpClusterSSA_tmpLambdaMapCounter = tmpClusterSSA_tmpLambdaMapCounter + 1;
      } else {
        break;
      }
    }
  }
  tmpLambdaMapOut.length = tmpLambdaMapLen;
  const tmpLambdaFilterLen = tmpPrevalAliasArgumentsAny.length;
  const tmpLambdaFilterTest = 0 < tmpLambdaFilterLen;
  const tmpLambdaFilterOut = [];
  if (tmpLambdaFilterTest) {
    if (0 in tmpPrevalAliasArgumentsAny) {
      const tmpLambdaFilterVal = tmpPrevalAliasArgumentsAny[0];
      if (tmpLambdaFilterVal > 2) {
        $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal);
      }
    }
    let tmpClusterSSA_tmpLambdaFilterCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFilterCounter < tmpLambdaFilterLen) {
        if (tmpClusterSSA_tmpLambdaFilterCounter in tmpPrevalAliasArgumentsAny) {
          const tmpLambdaFilterVal$1 = tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaFilterCounter];
          if (tmpLambdaFilterVal$1 > 2) {
            $dotCall($array_push, tmpLambdaFilterOut, `push`, tmpLambdaFilterVal$1);
          }
        }
        tmpClusterSSA_tmpLambdaFilterCounter = tmpClusterSSA_tmpLambdaFilterCounter + 1;
      } else {
        break;
      }
    }
  }
  const tmpLambdaReduceLen = tmpPrevalAliasArgumentsAny.length;
  let tmpLambdaReduceOut = 0;
  if (0 < tmpLambdaReduceLen) {
    if (0 in tmpPrevalAliasArgumentsAny) {
      const tmpLambdaReduceVal = tmpPrevalAliasArgumentsAny[0];
      tmpLambdaReduceOut = 0 + tmpLambdaReduceVal;
    }
    let tmpClusterSSA_tmpLambdaReduceCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen) {
        if (tmpClusterSSA_tmpLambdaReduceCounter in tmpPrevalAliasArgumentsAny) {
          tmpLambdaReduceOut = tmpLambdaReduceOut + tmpPrevalAliasArgumentsAny[tmpClusterSSA_tmpLambdaReduceCounter];
        }
        tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
      } else {
        break;
      }
    }
  }
  $(tmpLambdaMapOut, tmpLambdaFilterOut, tmpLambdaReduceOut, $dotCall($array_slice, tmpPrevalAliasArgumentsAny, undefined, 1, 3));
};
testArgsParameterShadowingArrayMethods(1, 2, 3, 4, 5);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b.length;
  const e = 0 < d;
  const f = [];
  if (e) {
    const g = 0 in b;
    if (g) {
      const h = b[ 0 ];
      const i = h * 2;
      f[0] = i;
    }
    let j = 1;
    while ($LOOP_UNROLL_10) {
      const k = j < d;
      if (k) {
        const l = j in b;
        if (l) {
          const m = b[ j ];
          const n = m * 2;
          f[j] = n;
        }
        j = j + 1;
      }
      else {
        break;
      }
    }
  }
  f.length = d;
  const o = b.length;
  const p = 0 < o;
  const q = [];
  if (p) {
    const r = 0 in b;
    if (r) {
      const s = b[ 0 ];
      const t = s > 2;
      if (t) {
        $dotCall( $array_push, q, "push", s );
      }
    }
    let u = 1;
    while ($LOOP_UNROLL_10) {
      const v = u < o;
      if (v) {
        const w = u in b;
        if (w) {
          const x = b[ u ];
          const y = x > 2;
          if (y) {
            $dotCall( $array_push, q, "push", x );
          }
        }
        u = u + 1;
      }
      else {
        break;
      }
    }
  }
  const z = b.length;
  let ba = 0;
  const bb = 0 < z;
  if (bb) {
    const bc = 0 in b;
    if (bc) {
      const bd = b[ 0 ];
      ba = 0 + bd;
    }
    let be = 1;
    while ($LOOP_UNROLL_10) {
      const bf = be < z;
      if (bf) {
        const bg = be in b;
        if (bg) {
          const bh = b[ be ];
          ba = ba + bh;
        }
        be = be + 1;
      }
      else {
        break;
      }
    }
  }
  const bi = $dotCall( $array_slice, b, undefined, 1, 3 );
  $( f, q, ba, bi );
  return undefined;
};
a( 1, 2, 3, 4, 5 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testArgsParameterShadowingArrayMethods = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const tmpCompObj = $Array_prototype;
  const tmpMCOO = tmpCompObj.map;
  const tmpMCF = tmpMCOO.call;
  const tmpMCP = function ($$0) {
    let x = $$0;
    debugger;
    const tmpReturnArg = x * 2;
    return tmpReturnArg;
  };
  const mapResult = $dotCall(tmpMCF, tmpMCOO, `call`, tmpPrevalAliasArgumentsAny, tmpMCP);
  const tmpCompObj$1 = $Array_prototype;
  const tmpMCOO$1 = tmpCompObj$1.filter;
  const tmpMCF$1 = tmpMCOO$1.call;
  const tmpMCP$1 = function ($$0) {
    let x$1 = $$0;
    debugger;
    const tmpReturnArg$1 = x$1 > 2;
    return tmpReturnArg$1;
  };
  const filterResult = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, tmpPrevalAliasArgumentsAny, tmpMCP$1);
  const tmpCompObj$3 = $Array_prototype;
  const tmpMCOO$3 = tmpCompObj$3.reduce;
  const tmpMCF$3 = tmpMCOO$3.call;
  const tmpMCP$3 = function ($$0, $$1) {
    let a = $$0;
    let b = $$1;
    debugger;
    const tmpReturnArg$3 = a + b;
    return tmpReturnArg$3;
  };
  const reduceResult = $dotCall(tmpMCF$3, tmpMCOO$3, `call`, tmpPrevalAliasArgumentsAny, tmpMCP$3, 0);
  const tmpCompObj$5 = $Array_prototype;
  const tmpMCOO$5 = tmpCompObj$5.slice;
  const tmpMCF$5 = tmpMCOO$5.call;
  const sliceResult = $dotCall(tmpMCF$5, tmpMCOO$5, `call`, tmpPrevalAliasArgumentsAny, 1, 3);
  $(mapResult, filterResult, reduceResult, sliceResult);
  return undefined;
};
testArgsParameterShadowingArrayMethods(1, 2, 3, 4, 5);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?
- (todo) array reads var statement with init BinaryExpression
- (todo) inline arguments when function does not have that many params yet
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $array_slice


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 4, 6, 8, 10], [3, 4, 5], 15, [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
