# Preval test case

# find_array_like.md

> Array methods > Find > Ai > Find array like
>
> Test: Array.find with array-like object

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
const result = Array.prototype.find.call(obj, x => x === 'b');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaFindLen /*:unknown*/ = obj.length;
const tmpLambdaFindTest /*:boolean*/ = 0 < tmpLambdaFindLen;
if (tmpLambdaFindTest) {
  const tmpLambdaFindVal /*:unknown*/ = obj[0];
  const tmpLambdaFindNow /*:boolean*/ = tmpLambdaFindVal === `b`;
  if (tmpLambdaFindNow) {
    $(`b`);
  } else {
    let tmpLambdaFindOut /*:primitive*/ = undefined;
    let tmpClusterSSA_tmpLambdaFindCounter /*:number*/ = 1;
    while ($LOOP_UNROLL_10) {
      const tmpLambdaFindTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaFindCounter < tmpLambdaFindLen;
      if (tmpLambdaFindTest$1) {
        const tmpLambdaFindVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaFindCounter];
        const tmpLambdaFindNow$1 /*:boolean*/ = tmpLambdaFindVal$1 === `b`;
        if (tmpLambdaFindNow$1) {
          tmpLambdaFindOut = `b`;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindOut);
  }
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, [2]: `c`, length: 3 });
const tmpLambdaFindLen = obj.length;
if (0 < tmpLambdaFindLen) {
  if (obj[0] === `b`) {
    $(`b`);
  } else {
    let tmpLambdaFindOut = undefined;
    let tmpClusterSSA_tmpLambdaFindCounter = 1;
    while (true) {
      if (tmpClusterSSA_tmpLambdaFindCounter < tmpLambdaFindLen) {
        if (obj[tmpClusterSSA_tmpLambdaFindCounter] === `b`) {
          tmpLambdaFindOut = `b`;
          break;
        } else {
          tmpClusterSSA_tmpLambdaFindCounter = tmpClusterSSA_tmpLambdaFindCounter + 1;
        }
      } else {
        break;
      }
    }
    $(tmpLambdaFindOut);
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
const d = 0 < c;
if (d) {
  const e = b[ 0 ];
  const f = e === "b";
  if (f) {
    $( "b" );
  }
  else {
    let g = undefined;
    let h = 1;
    while ($LOOP_UNROLL_10) {
      const i = h < c;
      if (i) {
        const j = b[ h ];
        const k = j === "b";
        if (k) {
          g = "b";
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
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, [2]: `c`, length: 3 };
const obj = $(tmpCalleeParam);
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.find;
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
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
