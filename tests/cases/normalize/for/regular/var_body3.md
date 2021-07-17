# Preval test case

# var_body3.md

> Normalize > For > Regular > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(x);) var x;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  while ($(x)) {
    x = undefined;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(x);
while (tmpIfTest) {
  x = undefined;
  tmpIfTest = $(x);
}
`````

## Output

`````js filename=intro
let tmpIfTest = $(undefined);
while (tmpIfTest) {
  tmpIfTest = $(undefined);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
