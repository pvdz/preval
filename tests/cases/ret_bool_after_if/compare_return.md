# Preval test case

# compare_return.md

> Ret bool after if > Compare return
>
> When the if-test must be a bool and the branches return true/false, the if can collapse.

## Input

`````js filename=intro
function f() {
  const x = $(100);
  if (x <= 100) {
    return true;
  } else {
    return false;
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  if (x <= 100) {
    return true;
  } else {
    return false;
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const x = $(100);
  const tmpIfTest = x <= 100;
  if (tmpIfTest) {
    return true;
  } else {
    return false;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(100);
const tmpIfTest /*:boolean*/ = x <= 100;
$(tmpIfTest);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = a <= 100;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
