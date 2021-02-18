# Preval test case

# var_read_write_read.md

> assigns > var_read_write_read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
$(1);
$(x, 'a'); // This read should be inlined by `undefined`
x = $(2); // After inlining the above, this should become a constant anyways
$(x, 'b');
`````

## Normalized

`````js filename=intro
var x;
$(1);
$(x, 'a');
x = $(2);
$(x, 'b');
`````

## Output

`````js filename=intro
$(1);
$(undefined, 'a');
const SSA_x = $(2);
$(SSA_x, 'b');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined, 'a'
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
