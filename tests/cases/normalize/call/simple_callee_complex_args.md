# Preval test case

# complex_object.md

> normalize > call > complex_object
>
> Calls should have simple idents

#TODO

## Input

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

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same