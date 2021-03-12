# Preval test case

# var_body.md

> Normalize > For > Regular > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(false);) var x = 0;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  while ($(false)) {
    x = 0;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = 0;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(false);
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
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
