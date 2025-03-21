# Preval test case

# number_toprecision_spies.md

> Normalize > Builtins > Methods > Number toprecision spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toPrecision(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
(200).toPrecision(x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(200).toPrecision($spy(`a`), $spy(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
200.toPrecision( a, b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support method $number_toPrecision


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].valueOf()', 'a'
 - eval returned: ('<crash[ toPrecision() argument must be between 1 and 100 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
