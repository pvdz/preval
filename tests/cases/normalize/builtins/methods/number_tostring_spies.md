# Preval test case

# number_tostring_spies.md

> Normalize > Builtins > Methods > Number tostring spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toString(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$spy(`b`);
$dotCall($number_toString, 200, `toString`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(`a`);
$spy(`b`);
$dotCall($number_toString, 200, `toString`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$dotCall( $number_toString, 200, "toString", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $number_toString;
const tmpArgOverflow = x;
$dotCall($number_toString, 200, `toString`, x);
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
 - eval returned: ('<crash[ toString() radix argument must be between 2 and 36 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
