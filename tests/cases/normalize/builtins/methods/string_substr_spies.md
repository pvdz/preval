# Preval test case

# string_substr_spies.md

> Normalize > Builtins > Methods > String substr spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".substr(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
$coerce(x, `number`);
$coerce(y, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
$coerce(x, `number`);
$coerce(y, `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
$coerce( a, "number" );
$coerce( b, "number" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].valueOf()', 'a'
 - 4: '$spy[2].valueOf()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
