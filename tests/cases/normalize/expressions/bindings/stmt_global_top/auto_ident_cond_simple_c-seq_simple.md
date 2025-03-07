# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident cond simple c-seq simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let a = 1 ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(60);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(60));
`````

## Pre Normal


`````js filename=intro
let a = 1 ? (40, 50, $(60)) : $($(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = undefined;
a = $(60);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 60 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 60
 - 2: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
