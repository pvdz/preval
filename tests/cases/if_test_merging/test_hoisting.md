# Preval test case

# test_hoisting.md

> If test merging > Test hoisting
>
> In this case the statement to hoist is mutating the test value. We can't allow that.

## Input

`````js filename=intro
let closure_cond = false;
  const repeat = function($$0) {
    const arg = $$0;
    debugger;
    if (closure_cond) {
      closure_cond = [];
      $(`a`);
    } else {
      closure_cond = [];
      $(`b`);
    }
    const tmpCalleeParam = arg + 1;
    repeat(tmpCalleeParam);
    return undefined;
  };
  repeat(0);
  $(repeat);
`````

## Pre Normal


`````js filename=intro
let closure_cond = false;
const repeat = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const arg = $dlr_$$0;
  if (closure_cond) {
    closure_cond = [];
    $(`a`);
  } else {
    closure_cond = [];
    $(`b`);
  }
  const tmpCalleeParam = arg + 1;
  repeat(tmpCalleeParam);
  return undefined;
};
repeat(0);
$(repeat);
`````

## Normalized


`````js filename=intro
let closure_cond = false;
const repeat = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const arg = $dlr_$$0;
  if (closure_cond) {
    closure_cond = [];
    $(`a`);
  } else {
    closure_cond = [];
    $(`b`);
  }
  const tmpCalleeParam = arg + 1;
  repeat(tmpCalleeParam);
  return undefined;
};
repeat(0);
$(repeat);
`````

## Output


`````js filename=intro
let closure_cond = false;
const repeat /*:(unknown)=>undefined*/ = function ($$0) {
  const $dlr_$$0 = $$0;
  debugger;
  if (closure_cond) {
    closure_cond = [];
    $(`a`);
  } else {
    closure_cond = [];
    $(`b`);
  }
  const tmpCalleeParam /*:primitive*/ = $dlr_$$0 + 1;
  repeat(tmpCalleeParam);
  return undefined;
};
repeat(0);
$(repeat);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = function($$0 ) {
  const c = $$0;
  debugger;
  if (a) {
    a = [];
    $( "a" );
  }
  else {
    a = [];
    $( "b" );
  }
  const d = c + 1;
  b( d );
  return undefined;
};
b( 0 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - 2: 'a'
 - 3: 'a'
 - 4: 'a'
 - 5: 'a'
 - 6: 'a'
 - 7: 'a'
 - 8: 'a'
 - 9: 'a'
 - 10: 'a'
 - 11: 'a'
 - 12: 'a'
 - 13: 'a'
 - 14: 'a'
 - 15: 'a'
 - 16: 'a'
 - 17: 'a'
 - 18: 'a'
 - 19: 'a'
 - 20: 'a'
 - 21: 'a'
 - 22: 'a'
 - 23: 'a'
 - 24: 'a'
 - 25: 'a'
 - 26: 'a'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
