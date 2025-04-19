# Preval test case

# string_replace_spies_func.md

> Pst > String replace spies func
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $('a');
const y = $spy('b');
"".replace(x, y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`a`);
const y /*:unknown*/ = $spy(`b`);
$dotCall($string_replace, ``, `replace`, x, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($string_replace, ``, `replace`, $(`a`), $spy(`b`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $spy( "b" );
$dotCall( $string_replace, "", "replace", a, b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: '$spy[1].toString()', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
