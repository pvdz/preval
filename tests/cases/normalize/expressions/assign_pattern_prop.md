# Preval test case

# assign_pattern_prop.md

> Normalize > Expressions > Assign pattern prop
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({ x } = 1).foo
`````


## Settled


`````js filename=intro
x = (1).x;
$Number_prototype.foo;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
x = (1).x;
$Number_prototype.foo;
`````


## PST Settled
With rename=true

`````js filename=intro
x = (1).x;
$Number_prototype.foo;
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
