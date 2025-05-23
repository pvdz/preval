# Preval test case

# number_tolocalstring_spies.md

> Normalize > Builtins > Methods > Number tolocalstring spies
>
> This is an exception in the spec and the args are optional but may be significant
> for ECMA402 support: https://tc39.es/ecma262/#sec-number.prototype.tolocalestring
>
> We must make sure not to accidentally eliminate them...

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
200..toLocaleString(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
$dotCall($number_toLocaleString, 200, `toLocaleString`, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($number_toLocaleString, 200, `toLocaleString`, $spy(`a`), $spy(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
$dotCall( $number_toLocaleString, 200, "toLocaleString", a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $number_toLocaleString;
$dotCall($number_toLocaleString, 200, `toLocaleString`, x, y);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toLocaleString


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
