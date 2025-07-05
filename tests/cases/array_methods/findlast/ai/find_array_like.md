# Preval test case

# find_array_like.md

> Array methods > Findlast > Ai > Find array like
>
> Test: Array.findLast with array-like object

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
const result = Array.prototype.findLast.call(obj, x => x === 'b');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaFindLastLen /*:unknown*/ = obj.length;
const tmpLambdaFindLastCounter /*:number*/ = tmpLambdaFindLastLen - 1;
const tmpLambdaFindLastTest /*:boolean*/ = tmpLambdaFindLastCounter >= 0;
if (tmpLambdaFindLastTest) {
  const tmpLambdaFindLastVal /*:unknown*/ = obj[tmpLambdaFindLastCounter];
  const tmpLambdaFindLastNow /*:boolean*/ = tmpLambdaFindLastVal === `b`;
  if (tmpLambdaFindLastNow) {
    $(`b`);
  } else {
    let tmpLambdaFindLastOut /*:primitive*/ = undefined;
    let tmpClusterSSA_tmpLambdaFindLastCounter /*:number*/ = tmpLambdaFindLastCounter - 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpLambdaFindLastTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindLastCounter >= 0;
      if (tmpLambdaFindLastTest$1) {
        const tmpLambdaFindLastVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaFindLastCounter];
        const tmpLambdaFindLastNow$1 /*:boolean*/ = tmpLambdaFindLastVal$1 === `b`;
        if (tmpLambdaFindLastNow$1) {
          tmpLambdaFindLastOut = `b`;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastOut);
  }
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, [2]: `c`, length: 3 });
const tmpLambdaFindLastCounter = obj.length - 1;
if (tmpLambdaFindLastCounter >= 0) {
  if (obj[tmpLambdaFindLastCounter] === `b`) {
    $(`b`);
  } else {
    let tmpLambdaFindLastOut = undefined;
    let tmpClusterSSA_tmpLambdaFindLastCounter = tmpLambdaFindLastCounter - 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindLastCounter >= 0) {
        if (obj[tmpClusterSSA_tmpLambdaFindLastCounter] === `b`) {
          tmpLambdaFindLastOut = `b`;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindLastCounter = tmpClusterSSA_tmpLambdaFindLastCounter - 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindLastOut);
  }
} else {
  $(undefined);
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
    $( "b" );
  }
  else {
    let h = undefined;
    let i = d - 1;
    while ($LOOP_UNROLLS_LEFT_10) {
      const j = i >= 0;
      if (j) {
        const k = b[ i ];
        const l = k === "b";
        if (l) {
          h = "b";
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
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.findLast;
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
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
