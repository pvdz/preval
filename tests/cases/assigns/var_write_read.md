# Preval test case

# var_write_read.md

> Assigns > Var write read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
$(1);
x = $(2); // This should become a constant
$(x, 'out');
`````

## Normalized

`````js filename=intro
let x = undefined;
$(1);
x = $(2);
$(x, 'out');
`````

## Output

`````js filename=intro
$(1);
const SSA_x = $(2);
$(SSA_x, 'out');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2, 'out'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
