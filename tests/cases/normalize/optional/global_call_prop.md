# Preval test case

# global_call_prop.md

> Normalize > Optional > Global call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$(parseInt(15)?.foo);
`````


## Settled


`````js filename=intro
const tmpChainElementObject /*:unknown*/ = $Number_prototype.foo;
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_prototype.foo);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.foo;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainRootCall = parseInt;
const tmpChainElementCall = 15;
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainElementCall.foo;
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
