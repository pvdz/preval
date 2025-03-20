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
