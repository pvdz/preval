# Preval test case

# minus_zero.md

> Typeof > Minus zero
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof -0);
`````

## Pre Normal

`````js filename=intro
$(typeof -0);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `number`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`number`);
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
