# Preval test case

# var_body4.md

> Normalize > For > Regular > Var body4
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(x);) var x = undefined;
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

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same