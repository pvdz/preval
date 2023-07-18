# Preval test case

# if-else_first.md

> Normalize > Return > If-else first
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  if ($(1)) return;
  else return $(2);
}

$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(1)) return;
  else return $(2);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
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
    return undefined;
  } else {
    const tmpReturnArg = $(2);
    return tmpReturnArg;
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
    return undefined;
  }
  else {
    const c = $( 2 );
    return c;
  }
},;
const d = a();
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
