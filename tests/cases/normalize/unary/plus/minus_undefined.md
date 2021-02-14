# Preval test case

# minus_undefined.md

> normalize > unary > minus > minus_undefined
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(+(-undefined));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = NaN;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(NaN);
`````

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
