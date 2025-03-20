# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = (1, 2, b)?.x)) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
$(undefined);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
