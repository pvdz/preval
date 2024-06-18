# Preval test case

# var_write_func_expr_read.md

> Assigns > Var write func expr read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant because we know the x won't be read before this assign
const f = function() { $(x, 'f'); }
f();
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(1);
x = $(2);
const f = function () {
  debugger;
  $(x, `f`);
};
f();
`````

## Normalized


`````js filename=intro
let x = undefined;
$(1);
x = $(2);
const f = function () {
  debugger;
  $(x, `f`);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(1);
const x = $(2);
$(x, `f`);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a, "f" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
