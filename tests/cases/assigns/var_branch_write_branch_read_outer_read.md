# Preval test case

# var_branch_write_branch_read_outer_read.md

> Assigns > Var branch write branch read outer read
>
> Turning a var into a const. Or not.

## Input

`````js filename=intro
var x;
if ($('if')) {
  x = 10; // Can not be made into a constant without branch extrapolation
  $(x); // We should be able to determine that this must be 10, somehow
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
if ($(`if`)) {
  x = 10;
  $(x);
}
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
const tmpIfTest = $(`if`);
if (tmpIfTest) {
  x = 10;
  $(x);
} else {
}
$(x);
`````

## Output


`````js filename=intro
let x /*:primitive*/ = undefined;
const tmpIfTest = $(`if`);
if (tmpIfTest) {
  x = 10;
  $(10);
} else {
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
const b = $( "if" );
if (b) {
  a = 10;
  $( 10 );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'if'
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
