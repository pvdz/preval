# Preval test case

# string_replace_spies_regex.md

> Pst > String replace spies regex
>
> Bug: was printing string as a var name

## Input

`````js filename=intro
const x = $spy('a');
const y = $('b');
"".replace(x, y);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $spy(`a`);
const y /*:unknown*/ = $(`b`);
``.replace(x, y);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
``.replace($spy(`a`), $(`b`));
`````

## Pre Normal


`````js filename=intro
const x = $spy(`a`);
const y = $(`b`);
``.replace(x, y);
`````

## Normalized


`````js filename=intro
const x = $spy(`a`);
const y = $(`b`);
``.replace(x, y);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
const b = $( "b" );
"".replace( a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'b'
 - 3: '$spy[1].toString()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
