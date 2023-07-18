# Preval test case

# add_to_str_flag.md

> Regex > Add to str flag
>
> Regexes are objects and always get turned into a string

#TODO

## Input

`````js filename=intro
$(/foo/g + "xyz");
`````

## Pre Normal

`````js filename=intro
$(/foo/g + `xyz`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = /foo/g;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}xyz`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`/foo/gxyz`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "/foo/gxyz" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/gxyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
