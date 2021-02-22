# Preval test case

# var_body.md

> Normalize > Dowhile > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x = 0; while (false);
`````

## Normalized

`````js filename=intro
var x;
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    x = 0;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same