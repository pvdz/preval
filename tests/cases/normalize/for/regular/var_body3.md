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

## Normalized

`````js filename=intro
var x;
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
var x;
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
