# Preval test case

# false.md

> Typeof > False
>
> Inlining `typeof` when we know something is a literal

## Input

`````js filename=intro
$(typeof false)
`````

## Pre Normal

`````js filename=intro
$(typeof false);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `boolean`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`boolean`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
