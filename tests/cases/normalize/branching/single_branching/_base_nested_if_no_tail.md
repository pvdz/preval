# Preval test case

# _base_nested_if_no_tail.md

> Normalize > Branching > Single branching > Base nested if no tail
>
> Functions should have at most one if-else and abstract others


## Input

`````js filename=intro
function f() {
  if ($(1)) {
    // This if-else should be abstracted into its own function
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    return $(5);
  }
}
$(f(), 'final');
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) {
    if ($(2)) {
      return $(3);
    } else {
      return $(4);
    }
  } else {
    return $(5);
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
    const tmpIfTest$1 = $(2);
    if (tmpIfTest$1) {
      const tmpReturnArg = $(3);
      return tmpReturnArg;
    } else {
      const tmpReturnArg$1 = $(4);
      return tmpReturnArg$1;
    }
  } else {
    const tmpReturnArg$3 = $(5);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
const tmpCalleeParam$1 = `final`;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpIfTest$1 = $(2);
  if (tmpIfTest$1) {
    const tmpReturnArg = $(3);
    tmpCalleeParam = tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(4);
    tmpCalleeParam = tmpReturnArg$1;
  }
} else {
  const tmpReturnArg$3 = $(5);
  tmpCalleeParam = tmpReturnArg$3;
}
$(tmpCalleeParam, `final`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( 1 );
if (b) {
  const c = $( 2 );
  if (c) {
    const d = $( 3 );
    a = d;
  }
  else {
    const e = $( 4 );
    a = e;
  }
}
else {
  const f = $( 5 );
  a = f;
}
$( a, "final" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
