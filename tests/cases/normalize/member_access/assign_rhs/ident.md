# Preval test case

# ident.md

> Normalize > Member access > Assign rhs > Ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
let x = 10;
x = $.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
x = $.length;
$(x);
`````

## Output

`````js filename=intro
const SSA_x = $.length;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
