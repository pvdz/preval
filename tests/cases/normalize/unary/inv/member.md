# Preval test case

# member.md

> normalize > unary > inv > member
>
> Inverting a member expression is two things

#TODO

## Input

`````js filename=intro
$(!Date.length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = Date.length;
const tmpCalleeParam = !tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = Date.length;
const tmpCalleeParam = !tmpUnaryArg;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
