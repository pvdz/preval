# Preval test case

# true.md

> exprstmt > true
>
> Booleans as statement can be eliminated

## Input

`````js filename=intro
true;
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
