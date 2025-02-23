# Preval test case

# name.md

> Builtins cases > Name
>
>

## Input

`````js filename=intro
$(String.name);
$(Array.name);
$(parseInt.name);
`````

## Pre Normal


`````js filename=intro
$(String.name);
$(Array.name);
$(parseInt.name);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = `String`;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = `Array`;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = parseInt.name;
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
$(`String`);
$(`Array`);
const tmpCalleeParam$3 /*:unknown*/ = parseInt.name;
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
$( "String" );
$( "Array" );
const a = parseInt.name;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'String'
 - 2: 'Array'
 - 3: 'parseInt'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
