# Preval test case

# if_nested_with_tail5.md

> Labels > If nested with tail5
>
> Make sure the labeled `if` doesn't screw up transforms

Just debugging a missing ident

#TODO

## Input

`````js filename=intro
const f = function (x) {
  label3: {
    break label3;
  }
  return $(x);
};
f(1);
`````

## Pre Normal

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  label3: {
    break label3;
  }
  return $(x);
};
f(1);
`````

## Normalized

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  const tmpLabeledBlockFunc = function ($$0) {
    let x$3 = $$0;
    debugger;
    const tmpReturnArg = tmpAfterLabel(x$3);
    return tmpReturnArg;
  };
  const tmpAfterLabel = function ($$0) {
    let x$1 = $$0;
    debugger;
    const tmpReturnArg$1 = $(x$1);
    return tmpReturnArg$1;
  };
  const tmpReturnArg$3 = tmpLabeledBlockFunc(x);
  return tmpReturnArg$3;
};
f(1);
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
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
