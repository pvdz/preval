# Preval test case

# member_norm.md

> Ai > Ai5 > Member norm
>
> Test member expression normalization

## Input

`````js filename=intro
const obj = {
    method: function(x) {
        return x + 1;
    }
};

const result = obj.method($(1));
$(result);

// Expected:
// const obj = {
//     method: function(x) {
//         return x + 1;
//     }
// };
// const result = $dotCall(obj, obj, "method", $(1));
// $(result);
`````


## Settled


`````js filename=intro
const tmpMCP /*:unknown*/ = $(1);
const result /*:primitive*/ = tmpMCP + 1;
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(1) + 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = a + 1;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = function ($$0) {
  let x = $$0;
  debugger;
  const tmpReturnArg = x + 1;
  return tmpReturnArg;
};
const obj = { method: tmpObjLitVal };
const tmpMCF = obj.method;
const tmpMCP = $(1);
const result = $dotCall(tmpMCF, obj, `method`, tmpMCP);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
