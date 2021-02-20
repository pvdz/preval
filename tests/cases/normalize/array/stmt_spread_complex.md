# Preval test case

# stmt_spread_complex.md

> Normalize > Array > Stmt spread complex
>
> Array statements should be eliminated

#TODO

## Input

`````js filename=intro
[...[$(10), 20], $(2), ...$([30, 40])];
`````

## Normalized

`````js filename=intro
$(10);
$(2);
const tmpCallCallee = $;
const tmpCalleeParam = [30, 40];
const tmpArrElToSpread = tmpCallCallee(tmpCalleeParam);
[...tmpArrElToSpread];
`````

## Output

`````js filename=intro
$(10);
$(2);
const tmpCalleeParam = [30, 40];
const tmpArrElToSpread = $(tmpCalleeParam);
[...tmpArrElToSpread];
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 2
 - 3: [30, 40]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
