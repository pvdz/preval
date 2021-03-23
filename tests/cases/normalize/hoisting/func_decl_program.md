# Preval test case

# func_decl_program.md

> Normalize > Hoisting > Func decl program
>
> Function declaration in toplevel

#TODO

## Input

`````js filename=intro
$(1);
function f() {}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
};
$(1);
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
};
$(1);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
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
