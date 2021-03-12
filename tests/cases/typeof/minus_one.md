# Preval test case

# minus_one.md

> Typeof > Minus one
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -1);
`````

## Pre Normal

`````js filename=intro
$(typeof -1);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
-1;
const tmpCalleeParam = 'number';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
-1;
$('number');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
