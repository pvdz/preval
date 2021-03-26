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
  const tmpBranchingA = function ($$0, $$1) {
    let tmpthis$1 = $$0;
    let t$1 = $$1;
    debugger;
    t$1 = $(2);
    const tmpReturnArg = tmpBranchingC(tmpthis$1, t$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpthis$3 = $$0;
    let t$3 = $$1;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpthis$3, t$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpthis$5 = $$0;
    let t$5 = $$1;
    debugger;
    if (t$5) {
      const g$1 = tmpthis$5;
    }
  };
  if (t) {
    const tmpReturnArg$3 = tmpBranchingA(tmpthis, t);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpthis, t);
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
