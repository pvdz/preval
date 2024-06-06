# Preval test case

# if_ssa_cons.md

> Ref tracking > Last write analysis > If ssa cons
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
  x = $(`c`);
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
  const tmpClusterSSA_x$1 = $(`c`);
  $(tmpClusterSSA_x$1);
} else {
  $(tmpClusterSSA_x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "a" );
$( a );
const b = $( "b" );
if ($) {
  const c = $( "c" );
  $( c );
}
else {
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'c'
 - 5: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
