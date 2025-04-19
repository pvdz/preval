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
$(200..foo)
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
$dotCall($number_toPrecision, 200, `toPrecision`, x, y);
const tmpCalleeParam /*:unknown*/ = $Number_prototype.foo;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($number_toPrecision, 200, `toPrecision`, $spy(`a`), $spy(`b`));
$($Number_prototype.foo);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
$dotCall( $number_toPrecision, 200, "toPrecision", a, b );
const c = $Number_prototype.foo;
$( c );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $number_toPrecision


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
