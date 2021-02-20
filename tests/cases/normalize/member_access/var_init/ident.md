# Preval test case

# ident.md

> Normalize > Member access > Var init > Ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
let x = $.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = $.length;
$(x);
`````

## Output

`````js filename=intro
const x = $.length;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
