# Preval test case

# var_body2.md

> Ifelse > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
if ($(true)) var x = 0;
$(x);
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
}
$(x);
`````

## Output

`````js filename=intro
var x;
const tmpIfTest = $(true);
if (tmpIfTest) {
  x = 0;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
