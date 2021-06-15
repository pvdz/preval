# Preval test case

# string_num_hex.md

> Normalize > Unary > Tilde > String num hex
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"0x0a05");
`````

## Pre Normal

`````js filename=intro
$(~`0x0a05`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -2566;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-2566);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2566
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
