# Preval test case

# empty_string_replace.md

> Tofix > empty string replace

existing test case

we used to resolve this to the empty string but that broke after the big dotcall update

## Input

`````js filename=intro
$(''.replace(/^/, String));
`````


## Settled


`````js filename=intro
$(``);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
