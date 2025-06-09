# Preval test case

# string_match_spies.md

> Normalize > Builtins > Methods > String match spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".match(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
$spy(`b`);
$dotCall($string_match, ``, `match`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $spy(`a`);
$spy(`b`);
$dotCall($string_match, ``, `match`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$dotCall( $string_match, "", "match", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $string_match;
const tmpArgOverflow = x;
$dotCall($string_match, ``, `match`, x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_match


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
