# Preval test case

# var_write_func_decl_read.md

> Assigns > Var write func decl read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // this should not be constant unless we can figure out the func decl
function f() { $(x, 'f'); }
f();
`````

## Normalized

`````js filename=intro
var x;
function f() {
  $(x, 'f');
}
$(1);
x = $(2);
f();
`````

## Output

`````js filename=intro
var x;
function f() {
  $(x, 'f');
}
$(1);
x = $(2);
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'f'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
