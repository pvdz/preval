# Preval test case

# simple_func_into_var_decl.md

> Function inlining > Simple func into var decl
>
> Attempt to create a case where a simple function is folded while the call is into a var decl.

#TODO

## Input

`````js filename=intro
let a = 10;
function f() {
  a = 20;
}
const p = f();
const q = f();
$(p, q);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  a = 20;
};
let a = 10;
const p = f();
const q = f();
$(p, q);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = 20;
  return undefined;
};
let a = 10;
const p = f();
const q = f();
$(p, q);
`````

## Output

`````js filename=intro
$(undefined, undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined, undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
