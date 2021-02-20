# Preval test case

# redundant_continue_label.md

> Labels > Redundant continue label
>
> The label is redundant because the continue does not span more than one loop. So it may as well not have had the label.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1);
  continue foo;
} while (false);
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag = true;
foo: while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(1);
    continue foo;
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
foo: while (true) {
  let tmpIfTest = tmpDoWhileFlag;
  if (tmpIfTest) {
  } else {
    tmpIfTest = false;
  }
  if (tmpIfTest) {
    tmpDoWhileFlag = false;
    $(1);
    continue foo;
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
