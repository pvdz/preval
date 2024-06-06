# Preval test case

# boolean_statement_too_many_args.md

> Normalize > Call > Boolean statement too many args
>
> A builtin with too many args that is a statement...

#TODO

## Input

`````js filename=intro
Boolean($spy('a'), $spy('b'), $spy('c'));
`````

## Pre Normal


`````js filename=intro
Boolean($spy(`a`), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
`````

## Output


`````js filename=intro
$spy(`a`);
$spy(`b`);
$spy(`c`);
`````

## PST Output

With rename=true

`````js filename=intro
$spy( "a" );
$spy( "b" );
$spy( "c" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, ['a', 'a']
 - 2: 'Creating spy', 2, 1, ['b', 'b']
 - 3: 'Creating spy', 3, 1, ['c', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
