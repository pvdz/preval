# Preval test case

# optional_norm.md

> Ai > Ai5 > Optional norm
>
> Test optional chaining normalization

## Input

`````js filename=intro
const obj = $(null);
const result = obj?.prop;
$(result);

// Expected:
// const obj = $(null);
// let result;
// if (obj === null || obj === undefined) {
//     result = undefined;
// } else {
//     result = obj.prop;
// }
// $(result);
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(null);
const tmpIfTest /*:boolean*/ = obj == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = obj.prop;
  $(tmpChainElementObject);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(null);
if (obj == null) {
  $(undefined);
} else {
  $(obj.prop);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( null );
const b = a == null;
if (b) {
  $( undefined );
}
else {
  const c = a.prop;
  $( c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = $(null);
let result = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.prop;
  result = tmpChainElementObject;
  $(tmpChainElementObject);
} else {
  $(result);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: null
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
