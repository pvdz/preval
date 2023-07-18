# Preval test case

# if_ssa_neither.md

> Last write analysis > If ssa neither
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// This write should be SSA'd because the `if` has no write
x = $('b');
if ($) {
  $('xyz');
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  $(`xyz`);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  $(`xyz`);
} else {
}
$(x);
`````

## Output

`````js filename=intro
const x = $(`a`);
$(x);
const tmpClusterSSA_x = $(`b`);
if ($) {
  $(`xyz`);
} else {
}
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
if ($) {
  $( "xyz" );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'xyz'
 - 5: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
