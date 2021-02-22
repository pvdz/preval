# Preval test case

# var_body3.md

> Normalize > Dowhile > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x; while ($(x));
`````

## Normalized

`````js filename=intro
var x;
let tmpDoWhileFlag = true;
while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = $(x);
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
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
    tmpIfTest = $(undefined);
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
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
