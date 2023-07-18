# Preval test case

# _base_nested_else_no_tail.md

> Normalize > Branching > Single branching > Base nested else no tail
>
> Functions should have at most one if-else and abstract others

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return $(2);
  } else {
    if ($(3)) {
      return $(4);
    } else {
      return $(5);
    }
  }
}
$(f(), 'final');
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    return $(2);
  } else {
    if ($(3)) {
      return $(4);
    } else {
      return $(5);
    }
  }
};
$(f(), `final`);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = `final`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  } else {
    const tmpIfTest$1 = $(3);
    if (tmpIfTest$1) {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$3 = $(5);
      return tmpReturnArg$3;
    }
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    const c = $( 2 );
    return c;
  }
  else {
    const d = $( 3 );
    if (d) {
      const e = $( 4 );
      return e;
    }
    else {
      const f = $( 5 );
      return f;
    }
  }
},;
const g = a();
$( g, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
