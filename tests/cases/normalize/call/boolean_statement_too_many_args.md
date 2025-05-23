# Preval test case

# boolean_statement_too_many_args.md

> Normalize > Call > Boolean statement too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
Boolean($spy('a'), $spy('b'), $spy('c'));
`````


## Settled


`````js filename=intro
$spy(`a`);
$spy(`b`);
$spy(`c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$spy(`a`);
$spy(`b`);
$spy(`c`);
`````


## PST Settled
With rename=true

`````js filename=intro
$spy( "a" );
$spy( "b" );
$spy( "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$spy(`a`);
$spy(`b`);
$spy(`c`);
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
