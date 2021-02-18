# Preval test case

# var_branch_write_branch_read_outer_read.md

> assigns > var_branch_write_branch_read_outer_read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
if ($('if')) {
  x = 10; // Can not be made into a constant without branch extrapolation
  $(x); // We should be able to determine that this must be 10, somehow
}
$(x);
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $('if');
if (tmpIfTest) {
  x = 10;
  $(x);
}
$(x);
`````

## Output

`````js filename=intro
var x;
const tmpIfTest = $('if');
if (tmpIfTest) {
  x = 10;
  $(x);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'if'
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
