# Preval test case

# _base_computed_obj.md

> Normalize > Optional > Base computed obj
>
> Simple example

## Input

`````js filename=intro
var f = {10: 20};
var x = 10;
$(f?.[x]);
`````


## Settled


`````js filename=intro
const f /*:object*/ = { [10]: 20 };
const tmpChainElementObject /*:unknown*/ = f[10];
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [10]: 20 }[10]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ 10 ]: 20 };
const b = a[ 10 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
let x = undefined;
f = { [10]: 20 };
x = 10;
let tmpCalleeParam = undefined;
const tmpChainRootProp = f;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = x;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
  $(tmpChainElementObject);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
