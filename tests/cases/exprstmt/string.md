# Preval test case

# string.md

> exprstmt > string
>
> String as statement can be eliminated

## Input

`````js filename=intro
"foo";
`````

## Normalized

`````js filename=intro
'foo';
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
