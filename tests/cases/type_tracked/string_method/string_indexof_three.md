# Preval test case

# string_indexof_three.md

> Type tracked > String method > String indexof three
>
> String indexOf should fully resolve

## Input

`````js filename=intro
$('hello'.indexOf('l', 1, $));
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_indexOf;
const tmpArgOverflow = `l`;
const tmpArgOverflow$1 = 1;
let tmpCalleeParam = $dotCall($string_indexOf, `hello`, `indexOf`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
