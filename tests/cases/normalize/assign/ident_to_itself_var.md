# Preval test case

# ident_to_itself_var.md

> Normalize > Assign > Ident to itself var
>
> An ident that assigns to itself should be considered a noop

Since we don't consider idents to have observable side effects, this should be a noop.

Not very likely to happen in the wild, though it may be an artifact after some normalization / reduction.

## Input

`````js filename=intro
let a = $(10);
let x = a = a;
$(a, x);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
$(a, a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10);
$(a, a);
`````

## Pre Normal


`````js filename=intro
let a = $(10);
let x = (a = a);
$(a, x);
`````

## Normalized


`````js filename=intro
let a = $(10);
let x = a;
$(a, a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a, a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 10, 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
