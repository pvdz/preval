# Preval test case

# reduce_negative_length.md

> Array methods > Reduce > Ai > Reduce negative length
>
> Test: Array.reduce with array-like object that has negative length

## Input

`````js filename=intro
const obj = $({ 0: 'a', 1: 'b', length: -1 });
const result = Array.prototype.reduce.call(obj, (acc, val) => acc + val, '');
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: -1 };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpLambdaReduceLen /*:unknown*/ = obj.length;
const tmpLambdaReduceTest /*:boolean*/ = 0 < tmpLambdaReduceLen;
if (tmpLambdaReduceTest) {
  let tmpLambdaReduceOut /*:string*/ = ``;
  const tmpLambdaReduceHas /*:boolean*/ = 0 in obj;
  if (tmpLambdaReduceHas) {
    const tmpLambdaReduceVal /*:unknown*/ = obj[0];
    tmpLambdaReduceOut = $coerce(tmpLambdaReduceVal, `plustr`);
  } else {
  }
  let tmpClusterSSA_tmpLambdaReduceCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaReduceTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen;
    if (tmpLambdaReduceTest$1) {
      const tmpLambdaReduceHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaReduceCounter in obj;
      if (tmpLambdaReduceHas$1) {
        const tmpLambdaReduceVal$1 /*:unknown*/ = obj[tmpClusterSSA_tmpLambdaReduceCounter];
        tmpLambdaReduceOut = tmpLambdaReduceOut + tmpLambdaReduceVal$1;
      } else {
      }
      tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
    } else {
      break;
    }
  }
  $(tmpLambdaReduceOut);
} else {
  $(``);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ [0]: `a`, [1]: `b`, length: -1 });
const tmpLambdaReduceLen = obj.length;
if (0 < tmpLambdaReduceLen) {
  let tmpLambdaReduceOut = ``;
  if (0 in obj) {
    tmpLambdaReduceOut = obj[0] + ``;
  }
  let tmpClusterSSA_tmpLambdaReduceCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaReduceCounter < tmpLambdaReduceLen) {
      if (tmpClusterSSA_tmpLambdaReduceCounter in obj) {
        tmpLambdaReduceOut = tmpLambdaReduceOut + obj[tmpClusterSSA_tmpLambdaReduceCounter];
      }
      tmpClusterSSA_tmpLambdaReduceCounter = tmpClusterSSA_tmpLambdaReduceCounter + 1;
    } else {
      break;
    }
  }
  $(tmpLambdaReduceOut);
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
  length: -1,
};
const b = $( a );
const c = b.length;
const d = 0 < c;
if (d) {
  let e = "";
  const f = 0 in b;
  if (f) {
    const g = b[ 0 ];
    e = $coerce( g, "plustr" );
  }
  let h = 1;
  while ($LOOP_UNROLL_10) {
    const i = h < c;
    if (i) {
      const j = h in b;
      if (j) {
        const k = b[ h ];
        e = e + k;
      }
      h = h + 1;
    }
    else {
      break;
    }
  }
  $( e );
}
else {
  $( "" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { [0]: `a`, [1]: `b`, length: -1 };
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
const result = $dotCall(tmpMCF, tmpMCOO, `call`, obj, tmpMCP, ``);
$(result);
`````


## Todos triggered


- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', length: '-1' }
 - 2: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
