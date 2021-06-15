# Preval test case

# base_array.md

> Type tracked > Typeof > Base array
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
$(typeof x);
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
$(typeof x);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`object`);
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
