# Preval test case

# bool_return_inv_false.md

> If test folding > Bool return inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(1) === 1;
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
  }
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
    return true;
  } else {
    return false;
  }
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
    return true;
  } else {
    return false;
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
  const tmpBinLhs = $(1);
  const x = tmpBinLhs === 1;
  return x;
};
f();
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  const c = b === 1;
  return c;
},;
a();
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
