# Preval test case

# iife2.md

> This > Iife2
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($(1)) {
    var g;
    if (typeof window !== 'undefined') {
      g = this;
    }
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  let g = undefined;
  if ($(1)) {
    if (typeof window !== 'undefined') {
      g = this;
    }
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  let g = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpBinLhs = typeof window;
    const tmpIfTest$1 = tmpBinLhs !== 'undefined';
    if (tmpIfTest$1) {
      g = tmpPrevalAliasThis;
    }
  }
};
f();
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    typeof window;
  }
};
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

window

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
