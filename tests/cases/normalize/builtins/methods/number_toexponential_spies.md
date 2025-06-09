# Preval test case

# number_toexponential_spies.md

> Normalize > Builtins > Methods > Number toexponential spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toExponential(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$spy(`b`);
$dotCall($number_toExponential, 200, `toExponential`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(`a`);
$spy(`b`);
$dotCall($number_toExponential, 200, `toExponential`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$dotCall( $number_toExponential, 200, "toExponential", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $number_toExponential;
const tmpArgOverflow = x;
$dotCall($number_toExponential, 200, `toExponential`, x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toExponential


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
