# Preval test case

# string_neq_nonempty_nonempty.md

> Typed comparison > String neq nonempty nonempty
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = String($('full'));
const y = x !== 'full';
$('out:', y);
`````

## Pre Normal

`````js filename=intro
const x = String($(`full`));
const y = x !== `full`;
$(`out:`, y);
`````

## Normalized

`````js filename=intro
const tmpStringFirstArg = $(`full`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== `full`;
$(`out:`, y);
`````

## Output

`````js filename=intro
const tmpStringFirstArg = $(`full`);
const x = $coerce(tmpStringFirstArg, `string`);
const y = x !== `full`;
$(`out:`, y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'full'
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same