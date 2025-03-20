# Preval test case

# auto_ident_template_simple.md

> Normalize > Expressions > Assignments > If > Auto ident template simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````


## Settled


`````js filename=intro
$(`fo1o`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`fo1o`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "fo1o" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
