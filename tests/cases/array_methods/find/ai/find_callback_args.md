# Preval test case

# find_callback_args.md

> Array methods > Find > Ai > Find callback args
>
> Test: Array.find callback arguments (value, index, array)

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
const result = arr.find((value, index, array) => {
  return value === 2 && index === 1 && array === arr;
});
$(result);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
const tmpMCF /*:unknown*/ = arr.find;
const tmpMCP /*:(unknown, unknown, unknown)=>boolean*/ = function ($$0, $$1, $$2) {
  const value /*:unknown*/ = $$0;
  const index /*:unknown*/ = $$1;
  const array /*:unknown*/ = $$2;
  debugger;
  const tmpReturnArg /*:boolean*/ = value === 2;
  if (tmpReturnArg) {
    const tmpClusterSSA_tmpReturnArg /*:boolean*/ = index === 1;
    if (tmpClusterSSA_tmpReturnArg) {
      const tmpClusterSSA_tmpReturnArg$1 /*:boolean*/ = array === arr;
      return tmpClusterSSA_tmpReturnArg$1;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const result /*:unknown*/ = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
const tmpMCF = arr.find;
$(
  $dotCall(tmpMCF, arr, `find`, function (value, index, array) {
    if (value === 2) {
      if (index === 1) {
        const tmpClusterSSA_tmpReturnArg$1 = array === arr;
        return tmpClusterSSA_tmpReturnArg$1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = b.find;
const d = function($$0,$$1,$$2 ) {
  const e = $$0;
  const f = $$1;
  const g = $$2;
  debugger;
  const h = e === 2;
  if (h) {
    const i = f === 1;
    if (i) {
      const j = g === b;
      return j;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};
const k = $dotCall( c, b, "find", d );
$( k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
const tmpMCF = arr.find;
const tmpMCP = function ($$0, $$1, $$2) {
  let value = $$0;
  let index = $$1;
  let array = $$2;
  debugger;
  let tmpReturnArg = value === 2;
  if (tmpReturnArg) {
    tmpReturnArg = index === 1;
    if (tmpReturnArg) {
      tmpReturnArg = array === arr;
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
  }
};
const result = $dotCall(tmpMCF, arr, `find`, tmpMCP);
$(result);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
