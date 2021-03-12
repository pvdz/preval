# Preval test case

# _base_nested_if_with_tail.md

> Normalize > Branching > Single branching > Base nested if with tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    if ($(2)) {
      $(3);
    } else {
      $(4);
    }
    return $(5);
  } else {
    $(6);
  }
  return $(7);
}
$(f(), 'final');
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      $(3);
    } else {
      $(4);
    }
    const tmpReturnArg = $(5);
    return tmpReturnArg;
  } else {
    $(6);
    const tmpReturnArg$1 = $(7);
    return tmpReturnArg$1;
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
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      $(3);
    } else {
      $(4);
    }
    const tmpReturnArg = $(5);
    return tmpReturnArg;
  } else {
    $(6);
    const tmpReturnArg$1 = $(7);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, 'final');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 5
 - 5: 5, 'final'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same