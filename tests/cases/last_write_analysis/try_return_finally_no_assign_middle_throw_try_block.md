# Preval test case

# try_return_finally_no_assign_middle_throw_try_block.md

> Last write analysis > Try return finally no assign middle throw try block
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
    // Without this assignment the next ref will want to see the previous assignment
    //x = $(3, 'prevent optim');
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
    x = $(2, 'prevent optim');
    do_observe_assignment;
    return x;
  } finally {
  }
  $('prevent return hoisting');
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
    x = $(2, 'prevent optim');
    do_observe_assignment;
    return x;
  } finally {
  }
  $('prevent return hoisting');
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
    x = $(2, 'prevent optim');
    do_observe_assignment;
    return x;
  } finally {
  }
  $('prevent return hoisting');
  return x;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

do_observe_assignment

## Result

Should call `$` with:
 - 1: 2, 'prevent optim'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same