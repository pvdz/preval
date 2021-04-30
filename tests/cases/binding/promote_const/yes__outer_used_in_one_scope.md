# Preval test case

# yes__outer_used_in_one_scope.md

> Binding > Promote const > Yes  outer used in one scope
>
> Can we inline hoisted vars

Ignore the comment below. It was wrong. The $() could potentially change x so the SSA is unsafe and invalid.

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

## Pre Normal

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $('something');
  x = 100;
  if ($(1)) {
    $(x);
  }
  $(x);
  return x;
};
f();
`````

## Normalized

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $('something');
  x = 100;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(x);
  } else {
  }
  $(x);
  return x;
};
f();
`````

## Output

`````js filename=intro
$('something');
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(100);
} else {
}
$(100);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
