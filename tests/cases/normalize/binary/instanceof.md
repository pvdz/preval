# Preval test case

# instanceof.md

> normalize > binary > instanceof
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 instanceof Infinity);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 5 instanceof Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = 5 instanceof Infinity;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Normalized calls: Same

Final output calls: Same
