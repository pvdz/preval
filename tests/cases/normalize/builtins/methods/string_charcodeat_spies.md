# Preval test case

# string_charcodeat_spies.md

> Normalize > Builtins > Methods > String charcodeat spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
"".charCodeAt(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$coerce(x, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce($spy(`a`), `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$coerce( a, "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const tmpMCF = $string_charCodeAt;
$coerce(x, `number`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
