# Preval test case

# var_body2.md

> Normalize > For > Regular > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(x);) var x = 0;
`````

## Normalized

`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = 0;
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
    x = 0;
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
