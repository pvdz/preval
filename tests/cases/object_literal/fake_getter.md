# Preval test case

# fake_getter.md

> Object literal > Fake getter
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

regression; output was wrong. the prop mutation should be a factor when checking if the binding escapes

## Input

`````js filename=intro
const obj = {
  x: 0
};
obj.x += 5;
$(obj.x); // 5
`````


## Settled


`````js filename=intro
$(5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(5);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 5 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
