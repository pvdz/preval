# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
1 || $(2);
`````

## Normalized

`````js filename=intro

`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
