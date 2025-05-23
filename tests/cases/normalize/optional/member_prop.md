# Preval test case

# member_prop.md

> Normalize > Optional > Member prop
>
> Optional chaining fun

## Input

`````js filename=intro
const x = 10;
$(x?.length);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Number_prototype.length;
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype.length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.length;
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
  const tmpChainElementObject = tmpChainRootProp.length;
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
