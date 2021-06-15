# Preval test case

# inv.md

> Normalize > Unary > Typeof > Inv
>
> Typeof always returns a string

#TODO

## Input

`````js filename=intro
$(typeof !$(100));
`````

## Pre Normal

`````js filename=intro
$(typeof !$(100));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(100);
const tmpCalleeParam = `boolean`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(100);
$(`boolean`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'boolean'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
