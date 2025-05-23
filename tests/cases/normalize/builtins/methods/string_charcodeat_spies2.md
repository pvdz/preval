# Preval test case

# string_charcodeat_spies2.md

> Normalize > Builtins > Methods > String charcodeat spies2
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('a');
"".charCodeAt(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$spy(`a`);
$coerce(x, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(`a`);
$spy(`a`);
$coerce(x, `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "a" );
$coerce( a, "number" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`a`);
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
 - 2: 'Creating spy', 2, 1, ['a', 'a']
 - 3: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
