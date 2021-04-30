# Preval test case

# iife.md

> This > Iife
>
> From the React header

#TODO

## Input

`````js filename=intro
const f = function () {
  let t = $(1);
  if (t) { t = $(2); }
  if (t) {
    const g = this;
  }
}
f();
`````

## Pre Normal

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  let t = $(1);
  if (t) {
    t = $(2);
  }
  if (t) {
    const g = tmpthis;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpthis = this;
  debugger;
  let t = $(1);
  if (t) {
    t = $(2);
    if (t) {
      const g = tmpthis;
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
const t = $(1);
if (t) {
  $(2);
} else {
}
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
