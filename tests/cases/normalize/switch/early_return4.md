# Preval test case

# early_return4.md

> Normalize > Switch > Early return4
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction + regression shortening)

#TODO

## Input

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a')
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b')
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c')
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a');
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b');
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c');
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a');
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b');
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c');
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  $('b');
  $('after inner');
  $('after outer');
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
