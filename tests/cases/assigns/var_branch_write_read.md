# Preval test case

# var_branch_write_read.md

> Assigns > Var branch write read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
var x; // This can be dropped
x = $(1, 'before'); // This can become a let
if ($(2, 'if')) {
  x = $(3, 'then'); // Do not change into a constant until we extrapolate branching models
}
$(x, 'final');
`````

## Pre Normal

`````js filename=intro
let x = undefined;
x = $(1, `before`);
if ($(2, `if`)) {
  x = $(3, `then`);
}
$(x, `final`);
`````

## Normalized

`````js filename=intro
let x = undefined;
x = $(1, `before`);
const tmpIfTest = $(2, `if`);
if (tmpIfTest) {
  x = $(3, `then`);
} else {
}
$(x, `final`);
`````

## Output

`````js filename=intro
let x = $(1, `before`);
const tmpIfTest = $(2, `if`);
if (tmpIfTest) {
  x = $(3, `then`);
  $(x, `final`);
} else {
  $(x, `final`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1, "before" );
const b = $( 2, "if" );
if (b) {
  a = $( 3, "then" );
  $( a, "final" );
}
else {
  $( a, "final" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'before'
 - 2: 2, 'if'
 - 3: 3, 'then'
 - 4: 3, 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
