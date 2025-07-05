# Preval test case

# find_array_like.md

> Array methods > FindIndex > Ai > Find array like
>
> Test: Array.findIndex with array-like object

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
const result = Array.prototype.findIndex.call(obj, x => x === 'b');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaFindIndexLen /*:unknown*/ = obj.length;
const tmpLambdaFindIndexTest /*:boolean*/ = 0 < tmpLambdaFindIndexLen;
if (tmpLambdaFindIndexTest) {
  const tmpLambdaFindIndexVal /*:unknown*/ = obj[0];
  const tmpLambdaFindIndexNow /*:boolean*/ = tmpLambdaFindIndexVal === `b`;
  if (tmpLambdaFindIndexNow) {
    $(0);
  } else {
    let tmpLambdaFindIndexOut /*:number*/ = -1;
    let tmpClusterSSA_tmpLambdaFindIndexCounter /*:number*/ = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpLambdaFindIndexTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindIndexCounter < tmpLambdaFindIndexLen;
      if (tmpLambdaFindIndexTest$1) {
        const tmpLambdaFindIndexVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaFindIndexCounter];
        const tmpLambdaFindIndexNow$1 /*:boolean*/ = tmpLambdaFindIndexVal$1 === `b`;
        if (tmpLambdaFindIndexNow$1) {
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindIndexOut);
  }
} else {
  $(-1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, [2]: `c`, length: 3 });
const tmpLambdaFindIndexLen = obj.length;
if (0 < tmpLambdaFindIndexLen) {
  if (obj[0] === `b`) {
    $(0);
  } else {
    let tmpLambdaFindIndexOut = -1;
    let tmpClusterSSA_tmpLambdaFindIndexCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindIndexCounter < tmpLambdaFindIndexLen) {
        if (obj[tmpClusterSSA_tmpLambdaFindIndexCounter] === `b`) {
          tmpLambdaFindIndexOut = tmpClusterSSA_tmpLambdaFindIndexCounter;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindIndexCounter = tmpClusterSSA_tmpLambdaFindIndexCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindIndexOut);
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
const d = 0 < c;
if (d) {
  const e = b[ 0 ];
  const f = e === "b";
  if (f) {
    $( 0 );
  }
  else {
    let g = -1;
    let h = 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const i = h < c;
      if (i) {
        const j = b[ h ];
        const k = j === "b";
        if (k) {
          g = h;
          break;
        }
        else {
          h = h + 1;
        }
      }
      else {
        break;
      }
    }
    $( g );
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
const tmpMCOO = tmpCompObj.findIndex;
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


- (todo) regular property access of an ident feels tricky;


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
