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

## Normalized

`````js filename=intro
function f() {}
$(1);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {}
$(1);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
