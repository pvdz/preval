# Preval test case

# base_string.md

> Type tracked > Typeof > Base string
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

## Input

`````js filename=intro
const x = '' + $(2);
$(typeof x);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(2);
$coerce(tmpBinBothRhs, `plustr`);
$(`string`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($(2), `plustr`);
$(`string`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
$coerce( a, "plustr" );
$( "string" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
