# Preval test case

# string_slice_none.md

> Type tracked > String method > String slice none
>
> String slice should fully resolve

## Input

`````js filename=intro
$('hello   world'.slice());
`````


## Settled


`````js filename=intro
$(`hello   world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`hello   world`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "hello   world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_slice;
let tmpCalleeParam = $dotCall($string_slice, `hello   world`, `slice`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
