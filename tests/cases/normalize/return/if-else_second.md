# Preval test case

# if-else_second.md

> Normalize > Return > If-else second
>
> Unused return statements should be eliminated

## Input

`````js filename=intro
function f() {
  if ($(0)) return $(1);
  else return;
}

$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($(0)) return $(1);
  else return;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(0);
  if (tmpIfTest) {
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  } else {
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpReturnArg /*:unknown*/ = $(1);
  $(tmpReturnArg);
} else {
  $(undefined);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  const b = $( 1 );
  $( b );
}
else {
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
