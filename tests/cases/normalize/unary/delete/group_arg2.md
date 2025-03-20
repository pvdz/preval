# Preval test case

# group_arg2.md

> Normalize > Unary > Delete > Group arg2
>
> Delete on non-property is valid but useless

## Input

`````js filename=intro
let foo = 1;
$(delete (null, foo));
$(typeof foo)
`````


## Settled


`````js filename=intro
$(true);
$(`number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`number`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "number" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
