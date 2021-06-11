# Preval test case

# bool_assign_true.md

> If test folding > Bool assign true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(1) === 1;
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  $('block'); // Prevent the assignments from getting inlined
  $('block');
  return y;
}
f();
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const x = $(1) === 1;
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  $('block');
  $('block');
  return y;
};
f();
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinLhs = $(1);
  const x = tmpBinLhs === 1;
  let y = undefined;
  if (x) {
    y = false;
  } else {
    y = true;
  }
  $('block');
  $('block');
  return y;
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
  const tmpBinLhs = $(1);
  const x = tmpBinLhs === 1;
  const y = !x;
  $('block');
  $('block');
  return y;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'block'
 - 3: 'block'
 - 4: 1
 - 5: 'block'
 - 6: 'block'
 - 7: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
