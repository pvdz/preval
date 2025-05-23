# Preval test case

# member_computed.md

> Normalize > Optional > Member computed
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.[20]);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Number_prototype[20];
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype[20]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype[ 20 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = 10;
let tmpCalleeParam = undefined;
const tmpChainRootProp = x;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = 20;
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
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
