# Preval test case

# var_write_func_expr_read.md

> assigns > var_write_func_expr_read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant because we know the x won't be read before this assign
const f = function() { $(x, 'f'); }
f();
`````

## Normalized

`````js filename=intro
var x;
$(1);
x = $(2);
const f = function () {
  $(x, 'f');
};
f();
`````

## Output

`````js filename=intro
$(1);
const SSA_x = $(2);
const f = function () {
  $(SSA_x, 'f');
};
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
