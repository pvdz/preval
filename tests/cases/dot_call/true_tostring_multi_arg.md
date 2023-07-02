# Preval test case

# true_tostring_multi_arg.md

> Dot call > True tostring multi arg
>
> Inlining $dotCall cases when we know what they are actually doing

## Input

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, $, unknown);
$(x);
`````

## Pre Normal

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, $, unknown);
$(x);
`````

## Normalized

`````js filename=intro
const bool = true;
const tmpCallVal = bool.toString;
const x = $dotCall(tmpCallVal, bool, $, unknown);
$(x);
`````

## Output

`````js filename=intro
unknown;
$(`true`);
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
