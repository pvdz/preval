# Preval test case

# var_body3.md

> Ifelse > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
if ($(true)) var x;
$(x);
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(true);
$(x);
`````

## Output

`````js filename=intro
$(true);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same