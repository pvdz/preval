# Preval test case

# redundant_continue_label.md

> labels > redundant_continue_label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

#TODO

## Input

`````js filename=intro
foo: do {
  do {
    $(1);
    continue foo;
  } while (false);
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
    let tmpDoWhileFlag$1 = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag$1;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = false;
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag$1 = false;
        $(1);
        continue foo;
      } else {
        break;
      }
    }
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
    let tmpDoWhileFlag$1 = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag$1;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = false;
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag$1 = false;
        $(1);
        continue foo;
      } else {
        break;
      }
    }
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
