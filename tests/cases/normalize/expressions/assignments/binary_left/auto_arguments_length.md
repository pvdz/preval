# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Binary left > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = arguments) + $(100));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = arguments;
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = arguments;
$(a + $(100));
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = arguments;
const b = $( 100 );
const c = a + b;
$( c );
$( a );
`````


## Globals


BAD@! Found 1 implicit global bindings:

arguments


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '[object Arguments]100'
 - 3: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
