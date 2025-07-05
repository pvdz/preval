# Preval test case

# reduceright_non_array_no_init.md

> Array methods > Reduceright > Ai > Reduceright non array no init
>
> Test: Array.reduceRight with non-array object without initial value

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: 2 });
const result = Array.prototype.reduceRight.call(obj, (acc, val) => acc + val);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaReduceRightLen /*:unknown*/ = obj.length;
const tmpLambdaReduceRightCounter /*:number*/ = tmpLambdaReduceRightLen - 1;
const tmpLambdaReduceRight1st /*:object*/ /*truthy*/ = {};
let tmpLambdaReduceRightOut /*:unknown*/ = tmpLambdaReduceRight1st;
const tmpLambdaReduceRightTest /*:boolean*/ = tmpLambdaReduceRightCounter >= 0;
if (tmpLambdaReduceRightTest) {
  const tmpLambdaReduceRightHas /*:boolean*/ = tmpLambdaReduceRightCounter in obj;
  if (tmpLambdaReduceRightHas) {
    tmpLambdaReduceRightOut = obj[tmpLambdaReduceRightCounter];
  } else {
  }
  let tmpClusterSSA_tmpLambdaReduceRightCounter /*:number*/ = tmpLambdaReduceRightCounter - 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpLambdaReduceRightTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceRightCounter >= 0;
    if (tmpLambdaReduceRightTest$1) {
      const tmpLambdaReduceRightHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceRightCounter in obj;
      if (tmpLambdaReduceRightHas$1) {
        const tmpLambdaReduceRightVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaReduceRightCounter];
        const tmpLambdaReduceRightBad$1 /*:boolean*/ = tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
        if (tmpLambdaReduceRightBad$1) {
          tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$1;
        } else {
          tmpLambdaReduceRightOut = tmpLambdaReduceRightOut + tmpLambdaReduceRightVal$1;
        }
      } else {
      }
      tmpClusterSSA_tmpLambdaReduceRightCounter = tmpClusterSSA_tmpLambdaReduceRightCounter - 1;
    } else {
      break;
    }
  }
} else {
}
const tmpLambdaReduceRightTTE /*:boolean*/ = tmpLambdaReduceRightOut === tmpLambdaReduceRight1st;
if (tmpLambdaReduceRightTTE) {
  const tmpLambdaReduceRightErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nresult\\n=\\n\$dotCall(\$array_reduceRight,\\nobj,\\nundefined,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(tmpLambdaReduceRightOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: 2 });
const tmpLambdaReduceRightCounter = obj.length - 1;
const tmpLambdaReduceRight1st = {};
let tmpLambdaReduceRightOut = tmpLambdaReduceRight1st;
if (tmpLambdaReduceRightCounter >= 0) {
  if (tmpLambdaReduceRightCounter in obj) {
    tmpLambdaReduceRightOut = obj[tmpLambdaReduceRightCounter];
  }
  let tmpClusterSSA_tmpLambdaReduceRightCounter = tmpLambdaReduceRightCounter - 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaReduceRightCounter >= 0) {
      if (tmpClusterSSA_tmpLambdaReduceRightCounter in obj) {
        const tmpLambdaReduceRightVal$1 = obj[tmpClusterSSA_tmpLambdaReduceRightCounter];
        if (tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
          tmpLambdaReduceRightOut = tmpLambdaReduceRightVal$1;
        } else {
          tmpLambdaReduceRightOut = tmpLambdaReduceRightOut + tmpLambdaReduceRightVal$1;
        }
      }
      tmpClusterSSA_tmpLambdaReduceRightCounter = tmpClusterSSA_tmpLambdaReduceRightCounter - 1;
    } else {
      break;
    }
  }
}
if (tmpLambdaReduceRightOut === tmpLambdaReduceRight1st) {
  const tmpLambdaReduceRightErr = new $typeError_constructor(
    `[Preval] Called .reduceRight without init on an array without values: \`const\\nresult\\n=\\n\$dotCall(\$array_reduceRight,\\nobj,\\nundefined,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceRightErr;
} else {
  $(tmpLambdaReduceRightOut);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: 2,
};
const b = $( a );
const c = b.length;
const d = c - 1;
const e = {};
let f = e;
const g = d >= 0;
if (g) {
  const h = d in b;
  if (h) {
    f = b[ d ];
  }
  let i = d - 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const j = i >= 0;
    if (j) {
      const k = i in b;
      if (k) {
        const l = b[ i ];
        const m = f === e;
        if (m) {
          f = l;
        }
        else {
          f = f + l;
        }
      }
      i = i - 1;
    }
    else {
      break;
    }
  }
}
const n = f === e;
if (n) {
  const o = new $typeError_constructor( "[Preval] Called .reduceRight without init on an array without values: `const\\nresult\\n=\\n$dotCall($array_reduceRight,\\nobj,\\nundefined,\\ntmpMCP);`" );
  throw o;
}
else {
  $( f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: 2 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.reduceRight;
const tmpMCF = tmpMCOO.call;
const tmpMCP = function ($$0, $$1) {
  let acc = $$0;
  let val = $$1;
  debugger;
  const tmpReturnArg = acc + val;
  return tmpReturnArg;
};
const result = $dotCall(tmpMCF, tmpMCOO, `call`, obj, tmpMCP);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', length: '2' }
 - 2: 'ba'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
