# Preval test case

# useless_arg.md

> normalize > delete > useless_arg
>
> Delete on non-property is valid but useless

#TODO

## Input

`````js filename=intro
$(delete $(1));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(true);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
