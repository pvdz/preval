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
const tmpCallCallee$1 = Number;
const tmpCalleeParam$1 = [`foo`];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
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
