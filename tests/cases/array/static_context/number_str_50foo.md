# Preval test case

# number_str_50foo.md

> Array > Static context > Number str 50foo
>
> Calling Number on arrays triggers coercion

## Input

`````js filename=intro
$(Number(['50foo']));
`````


## Settled


`````js filename=intro
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNumberFirstArg = [`50foo`];
let tmpCalleeParam = $coerce(tmpNumberFirstArg, `number`);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
