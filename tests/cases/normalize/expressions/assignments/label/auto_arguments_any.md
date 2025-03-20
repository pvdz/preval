# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Label > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = arguments;
$(a);
`````


## Settled


`````js filename=intro
$(arguments);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(arguments);
`````


## PST Settled
With rename=true

`````js filename=intro
$( arguments );
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
