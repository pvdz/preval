# Preval test case

# negative_call.md

> Normalize > Array > Negative call
>
> Make sure negative function calls are not considered a literal

#TODO

## Input

`````js filename=intro
$([-$()]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = $();
const tmpArrElement = -tmpUnaryArg;
const tmpCalleeParam = [tmpArrElement];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $();
const tmpArrElement = -tmpUnaryArg;
const tmpCalleeParam = [tmpArrElement];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: [NaN]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
