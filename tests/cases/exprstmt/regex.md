# Preval test case

# regex.md

> exprstmt > regex
>
> Regexes as statement can be eliminated

## Input

`````js filename=intro
/foo/g;
`````

## Normalized

`````js filename=intro
/foo/g;
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
