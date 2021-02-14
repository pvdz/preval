# Preval test case

# minus.md

> normalize > unary > typeof > minus
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof -$(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
-tmpUnaryArg;
const tmpCalleeParam = 'number';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
-tmpUnaryArg;
$('number');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
