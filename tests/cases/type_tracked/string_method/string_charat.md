# Preval test case

# string_charat.md

> Type tracked > String method > String charat
>
> String charAt should fully resolve

## Input

`````js filename=intro
$('hello'.charAt(2));
`````


## Settled


`````js filename=intro
$(`l`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`l`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "l" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_charAt;
let tmpCalleeParam = $dotCall($string_charAt, `hello`, `charAt`, 2);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'l'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
