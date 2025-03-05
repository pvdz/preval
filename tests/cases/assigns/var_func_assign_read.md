# Preval test case

# var_func_assign_read.md

> Assigns > Var func assign read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
x = 20; // Can be made into a constant
var f = () => x = 10;
x = 30; // Can not be made into a constant because of the arrow
$(f());
$(x);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
let x = undefined;
x = 20;
f = () => {
  debugger;
  return (x = 10);
};
x = 30;
$(f());
$(x);
`````

## Normalized


`````js filename=intro
let f = undefined;
let x = undefined;
x = 20;
f = function () {
  debugger;
  x = 10;
  return x;
};
x = 30;
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(x);
`````

## Output


`````js filename=intro
$(10);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
