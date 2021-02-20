# Preval test case

# regex.md

> Normalize > Unary > Typeof > Regex
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof /foo/);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /foo/;
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = /foo/;
const tmpCalleeParam = typeof tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
