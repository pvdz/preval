# Preval test case

# number_eq_string.md

> Typed comparison > Number eq string
>
> When comparing a primitive to a value whose type is determined (but not the actual value) can in many cases still be resolved.

#TODO

## Input

`````js filename=intro
const x = Number($(100));
const y = x === "";
$('out:', y);
`````

## Pre Normal

`````js filename=intro
const x = Number($(100));
const y = x === ``;
$(`out:`, y);
`````

## Normalized

`````js filename=intro
const tmpStringFirstArg = $(100);
const x = $coerce(tmpStringFirstArg, `number`);
const y = x === ``;
$(`out:`, y);
`````

## Output

`````js filename=intro
const tmpStringFirstArg = $(100);
$coerce(tmpStringFirstArg, `number`);
$(`out:`, false);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'out:', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same