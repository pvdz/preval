# Preval test case

# bool_return_true.md

> If test folding > Bool return true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(0) === 1;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
}
f();
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const x = $(0) === 1;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinLhs = $(0);
  const x = tmpBinLhs === 1;
  let y = undefined;
  if (x) {
    return false;
  } else {
    return true;
  }
};
f();
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpBinLhs = $(0);
  const x = tmpBinLhs !== 1;
  return x;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
