# Preval test case

# string_replace_spies.md

> Normalize > Builtins > Methods > String replace spies
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $spy('b');
"".replace(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $spy(`b`);
$dotCall($string_replace, ``, `replace`, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($string_replace, ``, `replace`, $spy(`a`), $spy(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $spy( "b" );
$dotCall( $string_replace, "", "replace", a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $spy(`a`);
const y = $spy(`b`);
const tmpMCF = $string_replace;
$dotCall($string_replace, ``, `replace`, x, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'a'
 - 4: '$spy[2].toString()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
