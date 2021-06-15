# Preval test case

# if_no_ssa_both.md

> Last write analysis > If no ssa both
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
if ($) {
  x = $('b');
} else {
  x = $('c');
}
// Read should reach two writes. No SSA possible (unless transformed to allow it)
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  x = $(`b`);
} else {
  x = $(`c`);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  x = $(`b`);
} else {
  x = $(`c`);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(`a`);
$(x);
if ($) {
  x = $(`b`);
} else {
  x = $(`c`);
}
$(x);
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
