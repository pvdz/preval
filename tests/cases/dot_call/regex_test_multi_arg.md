# Preval test case

# regex_test_multi_arg.md

> Dot call > Regex test multi arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, 'test', 'why is foo always used', $, unknown);
$(x);
`````

## Pre Normal


`````js filename=intro
const rex = /foo/;
const tmpCallVal = rex.test;
const x = $dotCall(tmpCallVal, rex, `test`, `why is foo always used`, $, unknown);
$(x);
`````

## Normalized


`````js filename=intro
const rex = /foo/;
const x = rex.test(`why is foo always used`, $, unknown);
$(x);
`````

## Output


`````js filename=intro
unknown;
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
unknown;
$( true );
`````

## Globals

BAD@! Found 1 implicit global bindings:

unknown

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
