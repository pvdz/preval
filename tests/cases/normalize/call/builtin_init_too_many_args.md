# Preval test case

# builtin_init_too_many_args.md

> Normalize > Call > Builtin init too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
const x = isNaN($spy('a'), $spy('b'), $spy('c'));
$(x);
`````

## Settled


`````js filename=intro
const tmpArgOverflow /*:unknown*/ = $spy(`a`);
$spy(`b`);
$spy(`c`);
const x /*:boolean*/ = isNaN(tmpArgOverflow);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
$(isNaN(tmpArgOverflow));
`````

## Pre Normal


`````js filename=intro
const x = isNaN($spy(`a`), $spy(`b`), $spy(`c`));
$(x);
`````

## Normalized


`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
const x = isNaN(tmpArgOverflow);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$spy( "c" );
const b = isNaN( a );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - 4: '$spy[1].valueOf()', 'a'
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
