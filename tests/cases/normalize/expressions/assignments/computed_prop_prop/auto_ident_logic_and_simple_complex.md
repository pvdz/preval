# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(a = 1 && $($(1)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
$coerce(a, `string`);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
$coerce(a, `string`);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$coerce( b, "string" );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
