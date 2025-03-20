# Preval test case

# string_split_spies.md

> Normalize > Builtins > Methods > String split spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".split(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
``.split(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
``.split($spy(`a`), $spy(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
"".split( a, b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[2].valueOf()', 'b'
 - 4: '$spy[1].toString()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
