# Preval test case

# if_ssa_alt.md

> Ref tracking > Last write analysis > If ssa alt
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// None of the remaining reads could possibly read the write above so the next write should SSA.
x = $('b');
if ($) {
} else {
  x = $('c');
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
} else {
  x = $(`c`);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
} else {
  x = $(`c`);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
if ($) {
  $(x);
} else {
  x = $(`c`);
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "a" );
$( a );
a = $( "b" );
if ($) {
  $( a );
}
else {
  a = $( "c" );
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
