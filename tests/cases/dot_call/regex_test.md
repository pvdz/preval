# Preval test case

# regex_test.md

> Dot call > Regex test
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'why is foo always used');
$(x);
`````

## Pre Normal


`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, `why is foo always used`);
$(x);
`````

## Normalized


`````js filename=intro
const rex = /foo/;
const x = rex.test(`why is foo always used`);
$(x);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
