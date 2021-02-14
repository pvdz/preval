# Preval test case

# void.md

> normalize > unary > typeof > void
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof void $(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(100);
undefined;
const tmpCalleeParam = 'undefined';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(100);
undefined;
$('undefined');
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'undefined'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
