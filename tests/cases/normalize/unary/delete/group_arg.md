# Preval test case

# group_arg.md

> Normalize > Unary > Delete > Group arg
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
$(delete (null, foo));
`````


## Settled


`````js filename=intro
foo;
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
foo;
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
foo;
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
foo;
let tmpCalleeParam = true;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

foo


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
