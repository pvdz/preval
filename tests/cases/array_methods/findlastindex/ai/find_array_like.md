# Preval test case

# find_array_like.md

> Array methods > Findlastindex > Ai > Find array like
>
> Test: Array.findLastIndex with array-like object

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
const result = Array.prototype.findLastIndex.call(obj, x => x === 'b');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaFindLastIndexLen /*:unknown*/ = obj.length;
const tmpLambdaFindLastIndexCounter /*:number*/ = tmpLambdaFindLastIndexLen - 1;
const tmpLambdaFindLastIndexTest /*:boolean*/ = tmpLambdaFindLastIndexCounter >= 0;
if (tmpLambdaFindLastIndexTest) {
  const tmpLambdaFindLastIndexVal /*:unknown*/ = obj[tmpLambdaFindLastIndexCounter];
  const tmpLambdaFindLastIndexNow /*:boolean*/ = tmpLambdaFindLastIndexVal === `b`;
  if (tmpLambdaFindLastIndexNow) {
    $(tmpLambdaFindLastIndexCounter);
  } else {
    let tmpLambdaFindLastIndexOut /*:unknown*/ = -1;
    let tmpClusterSSA_tmpLambdaFindLastIndexCounter /*:number*/ = tmpLambdaFindLastIndexCounter - 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindLastIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0;
      if (tmpLambdaFindLastIndexTest$1) {
        const tmpLambdaFindLastIndexVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaFindLastIndexCounter];
        const tmpLambdaFindLastIndexNow$1 /*:boolean*/ = tmpLambdaFindLastIndexVal$1 === `b`;
        if (tmpLambdaFindLastIndexNow$1) {
          tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastIndexOut);
  }
} else {
  $(-1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, [2]: `c`, length: 3 });
const tmpLambdaFindLastIndexCounter = obj.length - 1;
if (tmpLambdaFindLastIndexCounter >= 0) {
  if (obj[tmpLambdaFindLastIndexCounter] === `b`) {
    $(tmpLambdaFindLastIndexCounter);
  } else {
    let tmpLambdaFindLastIndexOut = -1;
    let tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpLambdaFindLastIndexCounter - 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindLastIndexCounter >= 0) {
        if (obj[tmpClusterSSA_tmpLambdaFindLastIndexCounter] === `b`) {
          tmpLambdaFindLastIndexOut = tmpClusterSSA_tmpLambdaFindLastIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastIndexCounter = tmpClusterSSA_tmpLambdaFindLastIndexCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastIndexOut);
  }
} else {
  $(-1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  [ 0 ]: "a",
  [ 1 ]: "b",
  [ 2 ]: "c",
  length: 3,
};
const b = $( a );
const c = b.length;
const d = c - 1;
const e = d >= 0;
if (e) {
  const f = b[ d ];
  const g = f === "b";
  if (g) {
    $( d );
  }
  else {
    let h = -1;
    let i = d - 1;
    while ($LOOP_UNROLL_10) {
      const j = i >= 0;
      if (j) {
        const k = b[ i ];
        const l = k === "b";
        if (l) {
          h = i;
          break;
        }
        else {
          i = i - 1;
        }
      }
      else {
        break;
      }
    }
    $( h );
  }
}
else {
  $( -1 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.findLastIndex;
const tmpMCF = tmpMCOO.call;
const tmpMCP = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x === `b`;
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
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"', length: '3' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
