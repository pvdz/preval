# Preval test case

# if-else_redundant.md

> Normalize > Return > If-else redundant
>
> Unused return statements should be eliminated

This is regular DCE

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) return $(1);
  else return $(2);
  return;
}

$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) return $(1);
  else return $(2);
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$1 = $(2);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    const c = $( 1 );
    return c;
  }
  else {
    const d = $( 2 );
    return d;
  }
},;
const e = a();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
