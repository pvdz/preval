# Preval test case

# regex.md

> Typeof > Regex
>
> Inlining `typeof` when we know something is a literal

Regular expressions are objects. They do not have a special type, only special syntax.

## Input

`````js filename=intro
$(typeof /1/);
`````

## Pre Normal

`````js filename=intro
$(typeof /1/);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('object');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
