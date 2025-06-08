# Preval test case

# faked.md

> Console > Faked
>
> This test will break if I change the global ref names

## Input

`````js filename=intro
const arr = $([1, 2, 3, 'consle test case']);
$dotCall($console_log, console, 'log', 'a', 'b', ...c);
$dotCall($console_warn, console, 'warn', 'a', 'b', ...c);
$dotCall($console_error, console, 'error', 'a', 'b', ...c);
$dotCall($console_dir, console, 'dir', 'a', 'b', ...c);
$dotCall($console_debug, console, 'debug', 'a', 'b', ...c);
$dotCall($console_time, console, 'time', 'a', 'b', ...c);
$dotCall($console_timeEnd, console, 'timeEnd', 'a', 'b', ...c);
$dotCall($console_group, console, 'group', 'a', 'b', ...c);
$dotCall($console_groupEnd, console, 'groupEnd', 'a', 'b', ...c);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3, `consle test case`];
$(tmpCalleeParam);
$dotCall($console_log, console, `log`, `a`, `b`, ...c);
$dotCall($console_warn, console, `warn`, `a`, `b`, ...c);
$dotCall($console_error, console, `error`, `a`, `b`, ...c);
$dotCall($console_dir, console, `dir`, `a`, `b`, ...c);
$dotCall($console_debug, console, `debug`, `a`, `b`, ...c);
$dotCall($console_time, console, `time`, `a`, `b`, ...c);
$dotCall($console_timeEnd, console, `timeEnd`, `a`, `b`, ...c);
$dotCall($console_group, console, `group`, `a`, `b`, ...c);
$dotCall($console_groupEnd, console, `groupEnd`, `a`, `b`, ...c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3, `consle test case`]);
$dotCall($console_log, console, `log`, `a`, `b`, ...c);
$dotCall($console_warn, console, `warn`, `a`, `b`, ...c);
$dotCall($console_error, console, `error`, `a`, `b`, ...c);
$dotCall($console_dir, console, `dir`, `a`, `b`, ...c);
$dotCall($console_debug, console, `debug`, `a`, `b`, ...c);
$dotCall($console_time, console, `time`, `a`, `b`, ...c);
$dotCall($console_timeEnd, console, `timeEnd`, `a`, `b`, ...c);
$dotCall($console_group, console, `group`, `a`, `b`, ...c);
$dotCall($console_groupEnd, console, `groupEnd`, `a`, `b`, ...c);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3, "consle test case" ];
$( a );
$dotCall( $console_log, console, "log", "a", "b", ...c );
$dotCall( $console_warn, console, "warn", "a", "b", ...c );
$dotCall( $console_error, console, "error", "a", "b", ...c );
$dotCall( $console_dir, console, "dir", "a", "b", ...c );
$dotCall( $console_debug, console, "debug", "a", "b", ...c );
$dotCall( $console_time, console, "time", "a", "b", ...c );
$dotCall( $console_timeEnd, console, "timeEnd", "a", "b", ...c );
$dotCall( $console_group, console, "group", "a", "b", ...c );
$dotCall( $console_groupEnd, console, "groupEnd", "a", "b", ...c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3, `consle test case`];
const arr = $(tmpCalleeParam);
$dotCall($console_log, console, `log`, `a`, `b`, ...c);
$dotCall($console_warn, console, `warn`, `a`, `b`, ...c);
$dotCall($console_error, console, `error`, `a`, `b`, ...c);
$dotCall($console_dir, console, `dir`, `a`, `b`, ...c);
$dotCall($console_debug, console, `debug`, `a`, `b`, ...c);
$dotCall($console_time, console, `time`, `a`, `b`, ...c);
$dotCall($console_timeEnd, console, `timeEnd`, `a`, `b`, ...c);
$dotCall($console_group, console, `group`, `a`, `b`, ...c);
$dotCall($console_groupEnd, console, `groupEnd`, `a`, `b`, ...c);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3, 'consle test case']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
