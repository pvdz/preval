# Preval test case

# literal.md

> Normalize > Member access > Var init > Literal
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
let x = 'foo'.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 3;
$(x);
`````

## Output

`````js filename=intro
$(3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
