# Preval test case

# concat.md

> Base > Concat
>
> Simple string concat

## Input

`````js filename=intro
$('a' + 'b')
`````

## Pre Normal

`````js filename=intro
$('a' + 'b');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 'ab';
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$('ab');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ab'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
