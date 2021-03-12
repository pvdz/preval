# Preval test case

# simple_callee_complex_args.md

> Normalize > Call > Simple callee complex args
>
> Calls should have simple idents

#TODO

## Input

`````js filename=intro
$($(1), $(2));
`````

## Pre Normal

`````js filename=intro
$($(1), $(2));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$(tmpCalleeParam, tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
