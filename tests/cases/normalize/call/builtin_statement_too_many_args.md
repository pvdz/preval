# Preval test case

# builtin_statement_too_many_args.md

> Normalize > Call > Builtin statement too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
isNaN($spy('a'), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
const tmpEA1 /*:unknown*/ = $spy(`a`);
$spy(`b`);
$spy(`c`);
$coerce(tmpEA1, `number`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpEA1 = $spy(`a`);
$spy(`b`);
$spy(`c`);
$coerce(tmpEA1, `number`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$spy( "c" );
$coerce( a, "number" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - 4: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
