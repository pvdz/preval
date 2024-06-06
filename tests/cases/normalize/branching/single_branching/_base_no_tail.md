# Preval test case

# _base_no_tail.md

> Normalize > Branching > Single branching > Base no tail
>
> A function with one branch should not be split

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) {
    return $(2);
  } else {
    return $(3);
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
    return $(3);
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
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
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
    const tmpReturnArg$1 = $(3);
    return tmpReturnArg$1;
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
    return d;
  }
};
const e = a();
$( e, "final" );
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
