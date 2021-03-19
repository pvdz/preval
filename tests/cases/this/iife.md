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
  let t = $(1);
  if (t) {
    t = $(2);
  }
  if (t) {
    const g = this;
  }
};
f();
`````

## Normalized

`````js filename=intro
const f = function () {
  const tmpPrevalAliasThis = this;
  let t = $(1);
  const tmpBranchingA = function (tmpPrevalAliasThis$1, t$1) {
    t$1 = $(2);
    const tmpReturnArg = tmpBranchingC(tmpPrevalAliasThis$1, t$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpPrevalAliasThis$2, t$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpPrevalAliasThis$2, t$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpPrevalAliasThis$3, t$3) {
    if (t$3) {
      const g$1 = tmpPrevalAliasThis$3;
    }
  };
  if (t) {
    const tmpReturnArg$2 = tmpBranchingA(tmpPrevalAliasThis, t);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpPrevalAliasThis, t);
    return tmpReturnArg$3;
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
