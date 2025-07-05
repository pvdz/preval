# Preval test case

# reduce_non_array_no_init.md

> Array methods > Reduce > Ai > Reduce non array no init
>
> Test: Array.reduce with non-array object without initial value

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: 2 });
const result = Array.prototype.reduce.call(obj, (acc, val) => acc + val);
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaReduceLen /*:unknown*/ = obj.length;
const tmpLambdaReduce1st /*:object*/ /*truthy*/ = {};
let tmpLambdaReduceOut /*:unknown*/ = tmpLambdaReduce1st;
const tmpLambdaReduceTest /*:boolean*/ = 0 < tmpLambdaReduceLen;
if (tmpLambdaReduceTest) {
  const tmpLambdaReduceHas /*:boolean*/ = 0 in obj;
  if (tmpLambdaReduceHas) {
    tmpLambdaReduceOut = obj[0];
  } else {
  }
  let tmpClusterSSA_tmpLambdaReduceCounter /*:number*/ = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpLambdaReduceTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen;
    if (tmpLambdaReduceTest$1) {
      const tmpLambdaReduceHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter in obj;
      if (tmpLambdaReduceHas$1) {
        const tmpLambdaReduceVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaReduceCounter];
        const tmpLambdaReduceBad$1 /*:boolean*/ = tmpLambdaReduceOut === tmpLambdaReduce1st;
        if (tmpLambdaReduceBad$1) {
          tmpLambdaReduceOut = tmpLambdaReduceVal$1;
        } else {
          tmpLambdaReduceOut = tmpLambdaReduceOut + tmpLambdaReduceVal$1;
        }
      } else {
      }
      tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
    } else {
      break;
    }
  }
} else {
}
const tmpLambdaReduceTTE /*:boolean*/ = tmpLambdaReduceOut === tmpLambdaReduce1st;
if (tmpLambdaReduceTTE) {
  const tmpLambdaReduceErr /*:object*/ /*truthy*/ = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nresult\\n=\\n\$dotCall(\$array_reduce,\\nobj,\\nundefined,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(tmpLambdaReduceOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: 2 });
const tmpLambdaReduceLen = obj.length;
const tmpLambdaReduce1st = {};
let tmpLambdaReduceOut = tmpLambdaReduce1st;
if (0 < tmpLambdaReduceLen) {
  if (0 in obj) {
    tmpLambdaReduceOut = obj[0];
  }
  let tmpClusterSSA_tmpLambdaReduceCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen) {
      if (tmpClusterSSA_tmpLambdaReduceCounter in obj) {
        const tmpLambdaReduceVal$1 = obj[tmpClusterSSA_tmpLambdaReduceCounter];
        if (tmpLambdaReduceOut === tmpLambdaReduce1st) {
          tmpLambdaReduceOut = tmpLambdaReduceVal$1;
        } else {
          tmpLambdaReduceOut = tmpLambdaReduceOut + tmpLambdaReduceVal$1;
        }
      }
      tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
    } else {
      break;
    }
  }
}
if (tmpLambdaReduceOut === tmpLambdaReduce1st) {
  const tmpLambdaReduceErr = new $typeError_constructor(
    `[Preval] Called .reduce without init on an array without values: \`const\\nresult\\n=\\n\$dotCall(\$array_reduce,\\nobj,\\nundefined,\\ntmpMCP);\``,
  );
  throw tmpLambdaReduceErr;
} else {
  $(tmpLambdaReduceOut);
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
const d = {};
let e = d;
const f = 0 < c;
if (f) {
  const g = 0 in b;
  if (g) {
    e = b[ 0 ];
  }
  let h = 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const i = h < c;
    if (i) {
      const j = h in b;
      if (j) {
        const k = b[ h ];
        const l = e === d;
        if (l) {
          e = k;
        }
        else {
          e = e + k;
        }
      }
      h = h + 1;
    }
    else {
      break;
    }
  }
}
const m = e === d;
if (m) {
  const n = new $typeError_constructor( "[Preval] Called .reduce without init on an array without values: `const\\nresult\\n=\\n$dotCall($array_reduce,\\nobj,\\nundefined,\\ntmpMCP);`" );
  throw n;
}
else {
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: 2 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.reduce;
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
 - 2: 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
