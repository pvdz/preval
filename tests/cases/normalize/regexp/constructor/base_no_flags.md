# Preval test case

# base_no_flags.md

> Normalize > Regexp > Constructor > Base no flags
>
> Creating a regexp through constructor is same as doing as literal

#TODO

## Input

`````js filename=intro
$(new RegExp("foo\\(x\\)"));
`````

## Pre Normal

`````js filename=intro
$(new RegExp(`foo\\(x\\)`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = /foo\(x\)/;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = /foo\(x\)/;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
