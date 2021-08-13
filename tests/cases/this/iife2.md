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
  const tmpPrevalAliasThis = this;
  debugger;
  let g = undefined;
  if ($(1)) {
    if (typeof window !== `undefined`) {
      g = tmpPrevalAliasThis;
    }
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = undefined;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpBinLhs = `undefined`;
    const tmpIfTest$1 = tmpBinLhs !== `undefined`;
    if (tmpIfTest$1) {
      g = tmpPrevalAliasThis;
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
f();
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
