# Preval test case

# reduceright_non_numeric_length.md

> Array methods > Reduceright > Ai > Reduceright non numeric length
>
> Test: Array.reduceRight with array-like object that has non-numeric length

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: '2' });
const result = Array.prototype.reduceRight.call(obj, (acc, val) => acc + val, '');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: `2` };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaReduceRightLen /*:unknown*/ = obj.length;
const tmpLambdaReduceRightCounter /*:number*/ = tmpLambdaReduceRightLen - 1;
const tmpLambdaReduceRightTest /*:boolean*/ = tmpLambdaReduceRightCounter >= 0;
if (tmpLambdaReduceRightTest) {
  let tmpLambdaReduceRightOut /*:string*/ = ``;
  const tmpLambdaReduceRightHas /*:boolean*/ = tmpLambdaReduceRightCounter in obj;
  if (tmpLambdaReduceRightHas) {
    const tmpLambdaReduceRightVal /*:unknown*/ = obj[tmpLambdaReduceRightCounter];
    tmpLambdaReduceRightOut = $coerce(tmpLambdaReduceRightVal, `plustr`);
  } else {
  }
  let tmpClusterSSA_tmpLambdaReduceRightCounter /*:number*/ = tmpLambdaReduceRightCounter - 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpLambdaReduceRightTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceRightCounter >= 0;
    if (tmpLambdaReduceRightTest$1) {
      const tmpLambdaReduceRightHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceRightCounter in obj;
      if (tmpLambdaReduceRightHas$1) {
        const tmpLambdaReduceRightVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaReduceRightCounter];
        tmpLambdaReduceRightOut = tmpLambdaReduceRightOut + tmpLambdaReduceRightVal$1;
      } else {
      }
      tmpClusterSSA_tmpLambdaReduceRightCounter = tmpClusterSSA_tmpLambdaReduceRightCounter - 1;
    } else {
      break;
    }
  }
  $(tmpLambdaReduceRightOut);
} else {
  $(``);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: `2` });
const tmpLambdaReduceRightCounter = obj.length - 1;
if (tmpLambdaReduceRightCounter >= 0) {
  let tmpLambdaReduceRightOut = ``;
  if (tmpLambdaReduceRightCounter in obj) {
    tmpLambdaReduceRightOut = obj[tmpLambdaReduceRightCounter] + ``;
  }
  let tmpClusterSSA_tmpLambdaReduceRightCounter = tmpLambdaReduceRightCounter - 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaReduceRightCounter >= 0) {
      if (tmpClusterSSA_tmpLambdaReduceRightCounter in obj) {
        tmpLambdaReduceRightOut = tmpLambdaReduceRightOut + obj[tmpClusterSSA_tmpLambdaReduceRightCounter];
      }
      tmpClusterSSA_tmpLambdaReduceRightCounter = tmpClusterSSA_tmpLambdaReduceRightCounter - 1;
    } else {
      break;
    }
  }
  $(tmpLambdaReduceRightOut);
} else {
  $(``);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  length: "2",
};
const b = $( a );
const c = b.length;
const d = c - 1;
const e = d >= 0;
if (e) {
  let f = "";
  const g = d in b;
  if (g) {
    const h = b[ d ];
    f = $coerce( h, "plustr" );
  }
  let i = d - 1;
  while ($LOOP_UNROLLS_LEFT_10) {
    const j = i >= 0;
    if (j) {
      const k = i in b;
      if (k) {
        const l = b[ i ];
        f = f + l;
      }
      i = i - 1;
    }
    else {
      break;
    }
  }
  $( f );
}
else {
  $( "" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: `2` };
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
const result = $dotCall(tmpMCF, tmpMCOO, `call`, obj, tmpMCP, ``);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', length: '"2"' }
 - 2: 'ba'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
