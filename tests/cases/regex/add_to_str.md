# Preval test case

# add_to_str.md

> Regex > Add to str
>
> Regexes are objects and always get turned into a string

#TODO

## Input

`````js filename=intro
$(/foo/ + "xyz");
`````

## Pre Normal

`````js filename=intro
$(/foo/ + `xyz`);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpBinLhs = /foo/;
const tmpStringConcatR = tmpBinLhs + ``;
const tmpCalleeParam = `${tmpStringConcatR}xyz`;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`/foo/xyz`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '/foo/xyz'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
