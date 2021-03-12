# Preval test case

# iife3.md

> This > Iife3
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($(1) && $(2)) {
    this;
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  if ($(1) && $(2)) {
    this;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  let tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpIfTest = $(2);
  }
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(2);
  }
};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
