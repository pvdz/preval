# Preval test case

# add_to_str_no_coerce.md

> Regex > Add to str no coerce
>
> Regexes are objects and always get turned into a string

#TODO

## Input

`````js filename=intro
$(/1/ + "xyz");
`````

## Pre Normal


`````js filename=intro
$(/1/ + `xyz`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = /1/;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}xyz`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`/1/xyz`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "/1/xyz" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/1/xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
