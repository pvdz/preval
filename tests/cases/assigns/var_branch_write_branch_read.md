# Preval test case

# var_branch_write_branch_read.md

> Assigns > Var branch write branch read
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

## Pre Normal

`````js filename=intro
let x = undefined;
if ($('if')) {
  x = 10;
  $(x);
}
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpIfTest = $('if');
if (tmpIfTest) {
  x = 10;
  $(x);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $('if');
if (tmpIfTest) {
  $(10);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'if'
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
