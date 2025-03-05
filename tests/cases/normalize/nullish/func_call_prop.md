# Preval test case

# func_call_prop.md

> Normalize > Nullish > Func call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(parseInt(15) ?? foo);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = 15;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = foo;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpReturnArg /*:unknown*/ = $(15);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 15 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - 2: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
