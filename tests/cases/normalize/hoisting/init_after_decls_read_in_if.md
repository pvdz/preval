# Preval test case

# init_after_decls_read_in_if.md

> Normalize > Hoisting > Init after decls read in if
>
> Reconcile var decl with its init after hoisting

This is the case where there's a var with init and a var decl. The var is used in a conditional.

#TODO

## Input

`````js filename=intro
function f() {
  return $(x, 'returned');
}
var x = 10;
const y = $(x, 'final');
$(y);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  return $(x, `returned`);
};
x = 10;
const y = $(x, `final`);
$(y);
`````

## Normalized

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  const tmpReturnArg = $(x, `returned`);
  return tmpReturnArg;
};
x = 10;
const y = $(x, `final`);
$(y);
`````

## Output

`````js filename=intro
const y = $(10, `final`);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10, 'final'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
