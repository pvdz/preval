# Preval test case

# add_to_num.md

> Regex > Add to num
>
> Regexes are objects and always get turned into a string

## Input

`````js filename=intro
$(/foo/ + 1);
`````

## Pre Normal


`````js filename=intro
$(/foo/ + 1);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = /foo/;
const tmpCalleeParam = tmpBinLhs + 1;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`/foo/1`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "/foo/1" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
