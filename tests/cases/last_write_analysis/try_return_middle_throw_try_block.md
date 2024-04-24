# Preval test case

# try_return_middle_throw_try_block.md

> Last write analysis > Try return middle throw try block
>
> Last write analysis should pick up on the return and assume that the prior write can not be observed later.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  try {
    x = $(2, 'prevent optim');
    do_observe_assignment
    return x;
  } finally {
    x = $(3, 'prevent optim');
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
  try {
    x = $(2, `prevent optim`);
    do_observe_assignment;
    return x;
  } finally {
    x = $(3, `prevent optim`);
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
  try {
    x = $(2, `prevent optim`);
    do_observe_assignment;
    return x;
  } finally {
    x = $(3, `prevent optim`);
  }
  $(`prevent return hoisting`);
  return x;
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
  try {
    x = $(2, `prevent optim`);
    do_observe_assignment;
    return x;
  } finally {
    x = $(3, `prevent optim`);
  }
  $(`prevent return hoisting`);
  return x;
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
  try {
    b = $( 2, "prevent optim" );
    do_observe_assignment;
    return b;
  }
finally {
    b = $( 3, "prevent optim" );
  }
  $( "prevent return hoisting" );
  return b;
};
const c = a();
$( c );
`````

## Globals

BAD@! Found 1 implicit global bindings:

do_observe_assignment

## Result

Should call `$` with:
 - 1: 2, 'prevent optim'
 - 2: 3, 'prevent optim'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
