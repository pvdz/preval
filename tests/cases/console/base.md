# Preval test case

# base.md

> Console > Base
>
>

## Input

`````js filename=intro
console.log('console test case');
`````


## Settled


`````js filename=intro
$dotCall($console_log, console, `log`, `console test case`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($console_log, console, `log`, `console test case`);
`````


## PST Settled
With rename=true

`````js filename=intro
$dotCall( $console_log, console, "log", "console test case" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: 'called $console_log:', 'console test case'
 - eval returned: undefined

Post settled calls: BAD!!
 - 1: 'called $console_log:', 'console test case'
 - eval returned: undefined

Denormalized calls: BAD!!
 - 1: 'called $console_log:', 'console test case'
 - eval returned: undefined
