# Preval test case

# string_indexof_four.md

> Type tracked > String method > String indexof four
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l', 1, $, unknown));
`````


## Settled


`````js filename=intro
unknown;
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_indexOf;
const tmpArgOverflow = `l`;
const tmpArgOverflow$1 = 1;
unknown;
let tmpCalleeParam = $dotCall($string_indexOf, `hello`, `indexOf`, tmpArgOverflow, tmpArgOverflow$1);
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
