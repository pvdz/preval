# Preval test case

# number_tolocalstring_spies.md

> Normalize > Builtins > Methods > Number tolocalstring spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toLocaleString(x, y);
`````


## Settled


`````js filename=intro
$spy(`a`);
$spy(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(`a`);
$spy(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$spy( "a" );
$spy( "b" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
