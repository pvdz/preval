# Preval test case

# base_boolean.md

> Type tracked > Typeof > Base boolean
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = $(1) === $(2);
$(typeof x);
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(`boolean`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(`boolean`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( "boolean" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
