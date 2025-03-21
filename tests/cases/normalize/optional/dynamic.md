# Preval test case

# dynamic.md

> Normalize > Optional > Dynamic
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.[$()]);
`````


## Settled


`````js filename=intro
const tmpChainRootComputed /*:unknown*/ = $();
const obj /*:object*/ = { foo: 10 };
const tmpChainElementObject /*:unknown*/ = obj[tmpChainRootComputed];
$(tmpChainElementObject);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainRootComputed = $();
$({ foo: 10 }[tmpChainRootComputed]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = { foo: 10 };
const c = b[ a ];
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
