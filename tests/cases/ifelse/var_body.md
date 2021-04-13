# Preval test case

# var_body.md

> Ifelse > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
if ($(true)) var x = 0;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
if ($(true)) x = 0;
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
} else {
}
`````

## Output

`````js filename=intro
$(true);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
