# Preval test case

# complex.md

> Console > Complex
>
>

## Input

`````js filename=intro
console.log(['console tet case']);
`````


## Settled


`````js filename=intro
const tmpMCP /*:array*/ /*truthy*/ = [`console tet case`];
$dotCall($console_log, console, `log`, tmpMCP);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$dotCall($console_log, console, `log`, [`console tet case`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "console tet case" ];
$dotCall( $console_log, console, "log", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $console_log;
const tmpMCP = [`console tet case`];
$dotCall(tmpMCF, console, `log`, tmpMCP);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: BAD!?
 - !1: 'called $console_log:', ['console tet case']
 - !eval returned: undefined

Post settled calls: BAD!!
 - !1: 'called $console_log:', ['console tet case']
 - !eval returned: undefined

Denormalized calls: BAD!!
 - !1: 'called $console_log:', ['console tet case']
 - !eval returned: undefined
