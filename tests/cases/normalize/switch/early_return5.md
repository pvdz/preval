# Preval test case

# early_return5.md

> Normalize > Switch > Early return5
>
> Sorting out the branching stuff

One fewer nesting

#TODO

## Input

`````js filename=intro
let f = function () {
  const x = 0;
  if (x) {
    $('a')
  } else {
    const y = 1;
    if (y) {
      $('b')
    } else {
      $('c')
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
  const x = 0;
  if (x) {
    $('a');
  } else {
    const y = 1;
    if (y) {
      $('b');
    } else {
      $('c');
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
  const x = 0;
  if (x) {
    $('a');
  } else {
    const y = 1;
    if (y) {
      $('b');
    } else {
      $('c');
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
