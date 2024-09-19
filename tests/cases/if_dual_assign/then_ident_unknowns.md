# Preval test case

# then_ident_unknowns.md

> If dual assign > Then ident unknowns
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('y', 'one');
const a = b === c;
if (a) {
  x = a; // Can be eliminated. Should not cause x to be set to a.
} else {
}
$(x, 'middle');
if (a) {
  x = true;
} else {
  x = false;
}
$(x, 'end');
`````

## Pre Normal


`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`y`, `one`);
const a = b === c;
if (a) {
  x = a;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## Normalized


`````js filename=intro
let x = false;
const b = $(`x`, `one`);
const c = $(`y`, `one`);
const a = b === c;
if (a) {
  x = a;
} else {
}
$(x, `middle`);
if (a) {
  x = true;
} else {
  x = false;
}
$(x, `end`);
`````

## Output


`````js filename=intro
const b = $(`x`, `one`);
const c = $(`y`, `one`);
const a /*:boolean*/ = b === c;
$(a, `middle`);
$(a, `end`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "x", "one" );
const b = $( "y", "one" );
const c = a === b;
$( c, "middle" );
$( c, "end" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x', 'one'
 - 2: 'y', 'one'
 - 3: false, 'middle'
 - 4: false, 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
