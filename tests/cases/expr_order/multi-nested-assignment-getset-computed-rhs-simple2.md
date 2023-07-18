# Preval test case

# multi-nested-assignment-getset-computed-rhs-simple2.md

> Expr order > Multi-nested-assignment-getset-computed-rhs-simple2
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test whether any step can affect the value of `e` before it is used as the value to update all the properties.

#TODO

## Input

`````js filename=intro
const objd = {
  get foo() {
    return 100;
  },
  set foo(a) {
    return 4000;
  },
};
const d = function () {
  $('a');
  $('b');
  return objd;
};
d();
$(d);
`````

## Pre Normal

`````js filename=intro
const objd = {
  get foo() {
    debugger;
    return 100;
  },
  set foo($$0) {
    let a = $$0;
    debugger;
    return 4000;
  },
};
const d = function () {
  debugger;
  $(`a`);
  $(`b`);
  return objd;
};
d();
$(d);
`````

## Normalized

`````js filename=intro
const objd = {
  get foo() {
    debugger;
    return 100;
  },
  set foo($$0) {
    let a = $$0;
    debugger;
    return 4000;
  },
};
const d = function () {
  debugger;
  $(`a`);
  $(`b`);
  return objd;
};
d();
$(d);
`````

## Output

`````js filename=intro
const objd = {
  get foo() {
    debugger;
    return 100;
  },
  set foo($$0) {
    debugger;
    return 4000;
  },
};
const d = function () {
  debugger;
  $(`a`);
  $(`b`);
  return objd;
};
d();
$(d);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
get foo() {
    debugger;
    return 100;
  },,
set foo( $$0 ) {
    debugger;
    return 4000;
  },
;
const b = function() {
  debugger;
  $( "a" );
  $( "b" );
  return a;
},;
b();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
