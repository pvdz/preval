# Preval test case

# literal_and_call.md

> Normalize > Array > Literal and call
>
> Make sure empty array works

## Input

`````js filename=intro
$([100, $()]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpArrElement = 100;
const tmpArrElement$1 = $();
const tmpCalleeParam = [tmpArrElement, tmpArrElement$1];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpArrElement$1 = $();
const tmpCalleeParam = [100, tmpArrElement$1];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [100, undefined]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
