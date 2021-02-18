# Preval test case

# var_branch_write_branch_read.md

> assigns > var_branch_write_branch_read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x;
if ($('if')) {
  x = 10; // Can be made into a constant
  $(x);
}
`````

## Normalized

`````js filename=intro
var x;
const tmpIfTest = $('if');
if (tmpIfTest) {
  x = 10;
  $(x);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $('if');
if (tmpIfTest) {
  $(10);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'if'
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
