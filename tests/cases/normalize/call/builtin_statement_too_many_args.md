# Preval test case

# builtin_statement_too_many_args.md

> Normalize > Call > Builtin statement too many args
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
isNaN($spy('a'), $spy('b'), $spy('c'));
`````

## Pre Normal


`````js filename=intro
isNaN($spy(`a`), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
isNaN(tmpArgOverflow);
`````

## Output


`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
isNaN(tmpArgOverflow);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$spy( "c" );
isNaN( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

isNaN

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - 4: '$spy[1].valueOf()', 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
