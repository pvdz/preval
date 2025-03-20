# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Call spread > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(...(a = (1, 2, b)?.x));
$(a);
`````


## Settled


`````js filename=intro
$(...1);
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...1);
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ...1 );
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
