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
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = undefined;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(undefined);
  if (tmpIfTest) {
  } else {
    break;
  }
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
