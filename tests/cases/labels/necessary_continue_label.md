# Preval test case

# necessary_continue_label.md

> Labels > Necessary continue label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

#TODO

## Input

`````js filename=intro
foo: do {
  $(1, 'outer');
  do {
    $(1, 'inner');
    continue foo;
  } while ($(false));
} while ($(false));
`````

## Pre Normal

`````js filename=intro
dropme: {
  let tmpDoWhileFlag$1 = true;
  foo: while (tmpDoWhileFlag$1 || $(false)) {
    tmpDoWhileFlag$1 = false;
    $(1, `outer`);
    {
      let tmpDoWhileFlag = true;
      while (tmpDoWhileFlag || $(false)) {
        tmpDoWhileFlag = false;
        {
          $(1, `inner`);
          continue foo;
        }
      }
    }
  }
}
`````

## Normalized

`````js filename=intro
let tmpDoWhileFlag$1 = true;
foo: while (true) {
  let tmpIfTest = tmpDoWhileFlag$1;
  if (tmpIfTest) {
  } else {
    tmpIfTest = $(false);
  }
  if (tmpIfTest) {
    tmpDoWhileFlag$1 = false;
    $(1, `outer`);
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(false);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $(1, `inner`);
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
let tmpDoWhileFlag$1 = true;
foo: while (true) {
  let tmpIfTest = tmpDoWhileFlag$1;
  if (tmpDoWhileFlag$1) {
  } else {
    tmpIfTest = $(false);
  }
  if (tmpIfTest) {
    tmpDoWhileFlag$1 = false;
    $(1, `outer`);
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpDoWhileFlag) {
      } else {
        tmpIfTest$1 = $(false);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $(1, `inner`);
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

## PST Output

With rename=true

`````js filename=intro
let a = true;
foo: while (true) {
  let b = a;
  if (a) {

  }
  else {
    b = $( false );
  }
  if (b) {
    a = false;
    $( 1, "outer" );
    let c = true;
    while (true) {
      let d = c;
      if (c) {

      }
      else {
        d = $( false );
      }
      if (d) {
        c = false;
        $( 1, "inner" );
        break foo;
      }
      else {
        break;
      }
    }
  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'outer'
 - 2: 1, 'inner'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
