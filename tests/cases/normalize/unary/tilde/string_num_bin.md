# Preval test case

# string_num_bin.md

> Normalize > Unary > Tilde > String num bin
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"0o1001");
`````

## Pre Normal

`````js filename=intro
$(~`0o1001`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -514;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(-514);
`````

## PST Output

With rename=true

`````js filename=intro
$( -514 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -514
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
