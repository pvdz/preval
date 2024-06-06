# Preval test case

# base_flags.md

> Normalize > Regexp > Constructor > Base flags
>
> Creating a regexp through constructor is same as doing as literal

#TODO

## Input

`````js filename=intro
$(new RegExp("foo\\(x\\)", "mg"));
`````

## Pre Normal


`````js filename=intro
$(new RegExp(`foo\\(x\\)`, `mg`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = /foo\(x\)/gm;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = /foo\(x\)/gm;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo\(x\)/gm;
$( a );
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
