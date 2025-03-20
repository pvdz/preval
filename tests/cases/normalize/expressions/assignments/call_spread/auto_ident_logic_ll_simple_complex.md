# Preval test case

# auto_ident_logic_ll_simple_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic ll simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 0 || $($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
$(...a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $($(1));
$(...a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
$( ...b );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
