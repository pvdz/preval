# Preval test case

# true.md

> normalize > unary > typeof > true
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof true);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'boolean';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('boolean');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same