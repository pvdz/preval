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
  const tmpBranchingA = function () {
    debugger;
    t = $(2);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    if (t) {
      const g$1 = tmpthis;
    }
  };
  if (t) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
f();
`````

## Output

`````js filename=intro
const t = $(1);
if (t) {
  $(2);
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
