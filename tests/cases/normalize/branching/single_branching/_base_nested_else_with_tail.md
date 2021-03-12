# Preval test case

# _base_nested_else_with_tail.md

> Normalize > Branching > Single branching > Base nested else with tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(0)) {
    $(2);
  } else {
    if ($(3)) {
      $(4);
    } else {
      $(5);
    }
    return $(6);
  }
  return $(7);
}
$(f(), 'final');
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$1 = $(7);
    return tmpReturnArg$1;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      $(4);
    } else {
      $(5);
    }
    const tmpReturnArg = $(6);
    return tmpReturnArg;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = 'final';
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    $(2);
    const tmpReturnArg$1 = $(7);
    return tmpReturnArg$1;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      $(4);
    } else {
      $(5);
    }
    const tmpReturnArg = $(6);
    return tmpReturnArg;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 3
 - 3: 4
 - 4: 6
 - 5: 6, 'final'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same