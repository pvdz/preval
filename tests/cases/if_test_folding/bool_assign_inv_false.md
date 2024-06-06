# Preval test case

# bool_assign_inv_false.md

> If test folding > Bool assign inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

#TODO

## Input

`````js filename=intro
function f() {
  const x = $(0) === 1;
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
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
  const x = $(0) === 1;
  let y = undefined;
  if (x) {
    y = true;
  } else {
    y = false;
  }
  $(`block`);
  $(`block`);
  return y;
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
    y = true;
  } else {
    y = false;
  }
  $(`block`);
  $(`block`);
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
  const tmpBinLhs = $(0);
  $(`block`);
  $(`block`);
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
  const b = $( 0 );
  $( "block" );
  $( "block" );
  const c = b === 1;
  return c;
};
a();
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 'block'
 - 3: 'block'
 - 4: 0
 - 5: 'block'
 - 6: 'block'
 - 7: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
