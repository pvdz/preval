# Preval test case

# regex_test_no_arg.md

> Dot call > Regex test no arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'test');
$(x);
`````

## Pre Normal


`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, `test`);
$(x);
`````

## Normalized


`````js filename=intro
const rex = /foo/;
const x = rex.test();
$(x);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
