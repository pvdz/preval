# Preval test case

# builtin_init_too_many_args.md

> Normalize > Call > Builtin init too many args
>
> A builtin with too many args that is a statement...

#TODO

## Input

`````js filename=intro
const x = isNaN($spy('a'), $spy('b'), $spy('c'));
$(x);
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

## Output

`````js filename=intro
const tmpArgOverflow = $spy(`a`);
$spy(`b`);
$spy(`c`);
const x = isNaN(tmpArgOverflow);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $spy( "a" );
$spy( "b" );
$spy( "c" );
const b = isNaN( a );
$( b );
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
 - 5: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
