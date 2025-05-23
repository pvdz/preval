# Preval test case

# string_valueof_spies.md

> Normalize > Builtins > Methods > String valueof spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".valueOf(x, y);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $string_valueOf;
`````


## Todos triggered


None


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
