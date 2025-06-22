# Preval test case

# every_non_array_object.md

> Array methods > Every > Ai > Every non array object
>
> Test: Array.every on array-like object

## Input

`````js filename=intro
const x = Array.prototype.every.call({0:'a',1:'b',length:2}, function(x) { $(x); });
$(x);
`````


## Settled


`````js filename=intro
const tmpMCP /*:object*/ /*truthy*/ = { [0]: `a`, [1]: `b`, length: 2 };
const tmpLambdaEveryHas /*:boolean*/ = 0 in tmpMCP;
if (tmpLambdaEveryHas) {
  const tmpLambdaEveryVal /*:unknown*/ = tmpMCP[0];
  $(tmpLambdaEveryVal);
  $(false);
} else {
  let tmpLambdaEveryOut /*:boolean*/ = true;
  let tmpClusterSSA_tmpLambdaEveryCounter /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    const tmpLambdaEveryTest$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter < 2;
    if (tmpLambdaEveryTest$1) {
      const tmpLambdaEveryHas$1 /*:boolean*/ = tmpClusterSSA_tmpLambdaEveryCounter in tmpMCP;
      if (tmpLambdaEveryHas$1) {
        const tmpLambdaEveryVal$1 /*:unknown*/ = tmpMCP[tmpClusterSSA_tmpLambdaEveryCounter];
        $(tmpLambdaEveryVal$1);
        tmpLambdaEveryOut = false;
        break;
      } else {
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaEveryOut);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
if (0 in tmpMCP) {
  $(tmpMCP[0]);
  $(false);
} else {
  let tmpLambdaEveryOut = true;
  let tmpClusterSSA_tmpLambdaEveryCounter = 1;
  while (true) {
    if (tmpClusterSSA_tmpLambdaEveryCounter < 2) {
      if (tmpClusterSSA_tmpLambdaEveryCounter in tmpMCP) {
        $(tmpMCP[tmpClusterSSA_tmpLambdaEveryCounter]);
        tmpLambdaEveryOut = false;
        break;
      } else {
        tmpClusterSSA_tmpLambdaEveryCounter = tmpClusterSSA_tmpLambdaEveryCounter + 1;
      }
    } else {
      break;
    }
  }
  $(tmpLambdaEveryOut);
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
const b = 0 in a;
if (b) {
  const c = a[ 0 ];
  $( c );
  $( false );
}
else {
  let d = true;
  let e = 1;
  while ($LOOP_UNROLL_10) {
    const f = e < 2;
    if (f) {
      const g = e in a;
      if (g) {
        const h = a[ e ];
        $( h );
        d = false;
        break;
      }
      else {
        e = e + 1;
      }
    }
    else {
      break;
    }
  }
  $( d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCompObj = $Array_prototype;
const tmpMCOO = tmpCompObj.every;
const tmpMCF = tmpMCOO.call;
const tmpMCP = { [0]: `a`, [1]: `b`, length: 2 };
const tmpMCP$1 = function ($$0) {
  let x$1 = $$0;
  debugger;
  $(x$1);
  return undefined;
};
const x = $dotCall(tmpMCF, tmpMCOO, `call`, tmpMCP, tmpMCP$1);
$(x);
`````


## Todos triggered


- (todo) objects in isFree check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
