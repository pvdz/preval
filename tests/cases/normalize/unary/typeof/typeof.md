# Preval test case

# typeof.md

> normalize > unary > typeof > typeof
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof typeof $(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
typeof tmpUnaryArg;
const tmpCalleeParam = 'string';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
typeof tmpUnaryArg;
$('string');
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 'string'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
