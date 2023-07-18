# Preval test case

# base_map.md

> Type tracked > Typeof > Base map
>
> If we know the type of a value without knowing the actual value, we can still resolve `typeof`

#TODO

## Input

`````js filename=intro
const x = new Map;
$(typeof x);
`````

## Pre Normal

`````js filename=intro
const x = new Map();
$(typeof x);
`````

## Normalized

`````js filename=intro
const x = new Map();
const tmpCallCallee = $;
const tmpCalleeParam = typeof x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
new Map();
$(`object`);
`````

## PST Output

With rename=true

`````js filename=intro
new Map();
$( "object" );
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
