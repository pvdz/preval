# Preval test case

# auto_arguments_any.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto arguments any
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = arguments)) {
  default:
    $(100);
}
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
$(100);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
$(100);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
$( 100 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
const tmpSwitchDisc = a;
$(100);
$(a);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
