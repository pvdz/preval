# Preval test case

# string_replace.md

> Pst > String replace
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $();
const y = $();
"".replace(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
const y /*:unknown*/ = $();
$dotCall($string_replace, ``, `replace`, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($string_replace, ``, `replace`, $(), $());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = $();
$dotCall( $string_replace, "", "replace", a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $();
const y = $();
const tmpMCF = $string_replace;
$dotCall($string_replace, ``, `replace`, x, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
