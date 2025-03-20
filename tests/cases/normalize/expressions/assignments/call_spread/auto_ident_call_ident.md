# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > Call spread > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $(1)));
$(a);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
$(...a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$(...a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( ...a );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
