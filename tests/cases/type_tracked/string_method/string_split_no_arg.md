# Preval test case

# string_split_no_arg.md

> Type tracked > String method > String split no arg
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split());
`````

## Pre Normal

`````js filename=intro
$(`hello world`.split());
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `hello world`.split();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`hello world`];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "hello world" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['hello world']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
