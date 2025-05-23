# Preval test case

# read_tostring.md

> Normalize > Number > Read tostring
>
> Reading the toString method from a number. We know what that is.

## Input

`````js filename=intro
const f = (31).toString;
$(f);
$(f + '');
`````


## Settled


`````js filename=intro
$($number_toString);
$(`function toString() { [native code] }`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($number_toString);
$(`function toString() { [native code] }`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $number_toString );
$( "function toString() { [native code] }" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = $number_toString;
$($number_toString);
let tmpCalleeParam = $coerce(f, `plustr`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'function() { [native code] }'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
