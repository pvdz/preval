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

## Normalized

`````js filename=intro
var x;
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

Normalized calls: Same

Final output calls: Same
