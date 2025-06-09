# Preval test case

# string_slice_four.md

> Type tracked > String method > String slice four
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice(5, 10, $, unknown));
`````


## Settled


`````js filename=intro
unknown;
$(`   wo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(`   wo`);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( "   wo" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_slice;
const tmpArgOverflow = 5;
const tmpArgOverflow$1 = 10;
unknown;
let tmpCalleeParam = $dotCall($string_slice, `hello   world`, `slice`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
