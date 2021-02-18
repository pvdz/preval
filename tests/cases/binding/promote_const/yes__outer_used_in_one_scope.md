# Preval test case

# hoisting_use_before_define.md

> binding > hoisting_use_before_define
>
> Can we inline hoisted vars

The outer var is only used in a single scope (so we can at least move it inside).

The var is set before any branching, so we can make it lexical there.

The var is only written to once so we can make it a constant.

The var is assigned a literal so we can inline it.

The x should be made a constant.

#TODO

## Input

`````js filename=intro
var x;
function f() {
  $("something");
  x = 100;
  if ($(1)) {
    $(x);
  }
  $(x);
  return x;
}
f();
`````

## Normalized

`````js filename=intro
var x;
function f() {
  $('something');
  x = 100;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(x);
  }
  $(x);
  return x;
}
f();
`````

## Output

`````js filename=intro
function f() {
  $('something');
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(100);
  }
  $(100);
  return 100;
}
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'something'
 - 2: 1
 - 3: 100
 - 4: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same