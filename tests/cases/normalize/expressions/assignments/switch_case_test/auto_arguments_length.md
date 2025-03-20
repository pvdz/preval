# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Switch case test > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = arguments):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
$(arguments);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(arguments);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( arguments );
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
