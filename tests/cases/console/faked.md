# Preval test case

# faked.md

> Console > Faked
>
> This test will break if I change the global ref names

## Input

`````js filename=intro
const arr = $([1, 2, 3, 'consle test case']);
$dotCall($console_log, console, 'a', 'b', ...c);
$dotCall($console_warn, console, 'a', 'b', ...c);
$dotCall($console_error, console, 'a', 'b', ...c);
$dotCall($console_dir, console, 'a', 'b', ...c);
$dotCall($console_debug, console, 'a', 'b', ...c);
$dotCall($console_time, console, 'a', 'b', ...c);
$dotCall($console_timeEnd, console, 'a', 'b', ...c);
$dotCall($console_group, console, 'a', 'b', ...c);
$dotCall($console_groupEnd, console, 'a', 'b', ...c);
`````

## Pre Normal


`````js filename=intro
const arr = $([1, 2, 3, `consle test case`]);
$dotCall($console_log, console, `a`, `b`, ...c);
$dotCall($console_warn, console, `a`, `b`, ...c);
$dotCall($console_error, console, `a`, `b`, ...c);
$dotCall($console_dir, console, `a`, `b`, ...c);
$dotCall($console_debug, console, `a`, `b`, ...c);
$dotCall($console_time, console, `a`, `b`, ...c);
$dotCall($console_timeEnd, console, `a`, `b`, ...c);
$dotCall($console_group, console, `a`, `b`, ...c);
$dotCall($console_groupEnd, console, `a`, `b`, ...c);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2, 3, `consle test case`];
const arr = tmpCallCallee(tmpCalleeParam);
$dotCall($console_log, console, `a`, `b`, ...c);
$dotCall($console_warn, console, `a`, `b`, ...c);
$dotCall($console_error, console, `a`, `b`, ...c);
$dotCall($console_dir, console, `a`, `b`, ...c);
$dotCall($console_debug, console, `a`, `b`, ...c);
$dotCall($console_time, console, `a`, `b`, ...c);
$dotCall($console_timeEnd, console, `a`, `b`, ...c);
$dotCall($console_group, console, `a`, `b`, ...c);
$dotCall($console_groupEnd, console, `a`, `b`, ...c);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2, 3, `consle test case`];
$(tmpCalleeParam);
console.log(`a`, `b`, ...c);
console.warn(`a`, `b`, ...c);
console.error(`a`, `b`, ...c);
console.dir(`a`, `b`, ...c);
console.debug(`a`, `b`, ...c);
console.time(`a`, `b`, ...c);
console.timeEnd(`a`, `b`, ...c);
console.group(`a`, `b`, ...c);
console.groupEnd(`a`, `b`, ...c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3, "consle test case" ];
$( a );
console.log( "a", "b", ...c );
console.warn( "a", "b", ...c );
console.error( "a", "b", ...c );
console.dir( "a", "b", ...c );
console.debug( "a", "b", ...c );
console.time( "a", "b", ...c );
console.timeEnd( "a", "b", ...c );
console.group( "a", "b", ...c );
console.groupEnd( "a", "b", ...c );
`````

## Globals

BAD@! Found 1 implicit global bindings:

c

## Result

Should call `$` with:
 - 1: [1, 2, 3, 'consle test case']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
