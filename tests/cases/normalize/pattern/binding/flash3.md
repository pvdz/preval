# Preval test case

# flash3.md

> Normalize > Pattern > Binding > Flash3
>
> Regression hunting 

Derived from `function x(foo = x, {x}) {}`

## Input

`````js filename=intro
const f = function (a) {
  a = unknown; // This is correct. The default refers to a following param which is tdz
};
f();
`````


## Settled


`````js filename=intro
unknown;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
