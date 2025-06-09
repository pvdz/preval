# Preval test case

# string_lastindexof_three.md

> Type tracked > String method > String lastindexof three
>
> String lastIndexOf should fully resolve

## Input

`````js filename=intro
$('hello'.lastIndexOf('e', 4, $));
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_lastIndexOf;
const tmpArgOverflow = `e`;
const tmpArgOverflow$1 = 4;
let tmpCalleeParam = $dotCall($string_lastIndexOf, `hello`, `lastIndexOf`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
