# Preval test case

# number_str_foo.md

> Array > Static context > Number str foo
>
> Calling Number on arrays triggers coercion

#TODO

## Input

`````js filename=intro
$(Number(['foo']));
`````

## Pre Normal

`````js filename=intro
$(Number([`foo`]));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpStringFirstArg = [`foo`];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(NaN);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
