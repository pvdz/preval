# Preval test case

# elided.md

> Normalize > Array > Elided
>
> Make sure normalization doesn't choke over elided elements

## Input

`````js filename=intro
$([1, $(),, 2,, $(),,]);
`````

## Pre Normal

`````js filename=intro
$([1, $(), , 2, , $(), ,]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = 1;
const tmpArrElement$1 = $();
const tmpArrElement$3 = 2;
const tmpArrElement$5 = $();
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1, , tmpArrElement$3, , tmpArrElement$5, ,];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement$1 = $();
const tmpArrElement$5 = $();
const tmpCalleeParam = [1, tmpArrElement$1, , 2, , tmpArrElement$5, ,];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
const b = $();
const c = [ 1, a, , 2, , b, ,, ];
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: [1, undefined, , 2, , undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
