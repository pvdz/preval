# Preval test case

# if_both2.md

> Function onecall > Assign > If both2
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(tmpCalleeParam);
const g = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    g(); // Recursion
  } else {
    $('b');
  }
};
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $('c');
  x = undefined;
} else {
  x = undefined;
}
x = f();
$(x);
const tmpCalleeParam$1 = x;
$(tmpCalleeParam$1);
`````

## Pre Normal

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(tmpCalleeParam);
const g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    g();
  } else {
    $('b');
  }
};
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $('c');
  x = undefined;
} else {
  x = undefined;
}
x = f();
$(x);
const tmpCalleeParam$1 = x;
$(tmpCalleeParam$1);
`````

## Normalized

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(tmpCalleeParam);
const g = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('a');
    g();
    return undefined;
  } else {
    $('b');
    return undefined;
  }
};
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $('c');
  x = undefined;
} else {
  x = undefined;
}
x = f();
$(x);
const tmpCalleeParam$1 = x;
$(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const x = $(100);
$(x);
const tmpIfTest$1 = $(1);
if (tmpIfTest$1) {
  $('c');
} else {
}
const tmpSSA_x = f();
$(tmpSSA_x);
$(tmpSSA_x);
`````

## Globals

BAD@! Found 1 implicit global bindings:

f

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'c'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
