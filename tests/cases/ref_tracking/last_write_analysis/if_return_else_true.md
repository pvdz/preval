# Preval test case

# if_return_else_true.md

> Ref tracking > Last write analysis > If return else true
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  if ($(true)) {
    x = $(1, 'prevent optim');
    return x;
  } else {
    x = $(2, 'prevent optim');
  }
  
  $('prevent return hoisting');
  return x;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  if ($(true)) {
    x = $(1, `prevent optim`);
    return x;
  } else {
    x = $(2, `prevent optim`);
  }
  $(`prevent return hoisting`);
  return x;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(1, `prevent optim`);
    return x;
  } else {
    x = $(2, `prevent optim`);
    $(`prevent return hoisting`);
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let x = 1;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    x = $(1, `prevent optim`);
    return x;
  } else {
    x = $(2, `prevent optim`);
    $(`prevent return hoisting`);
    return x;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = 1;
  const c = $( true );
  if (c) {
    b = $( 1, "prevent optim" );
    return b;
  }
  else {
    b = $( 2, "prevent optim" );
    $( "prevent return hoisting" );
    return b;
  }
};
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 1, 'prevent optim'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same