# Preval test case

# call.md

> normalize > new > call
>
> Make sure normalization doesn't choke over elided elements

## Input

`````js filename=intro
$([1, $(),, 2,, $(),,]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = 1;
const tmpArrElement$1 = $();
const tmpArrElement$2 = 2;
const tmpArrElement$3 = $();
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1, , tmpArrElement$2, , tmpArrElement$3, ,];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement$1 = $();
const tmpArrElement$3 = $();
const tmpCalleeParam = [1, tmpArrElement$1, , 2, , tmpArrElement$3, ,];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: [1, undefined, , 2, , undefined]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
