# Preval test case

# else_ident_unknowns.md

> If dual assign > Else ident unknowns
>
> This case should make sure we don't accidentally set a var to a value it should not be having

## Input

`````js filename=intro
let x = false;
const b = $('x', 'one');
const c = $('y', 'one');
const a = b === c;
if (a) {
} else {
  x = a; // Can be eliminated. Should not cause x to be set to a.
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
} else {
  x = a;
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
} else {
  x = a;
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
const b /*:unknown*/ = $(`x`, `one`);
const c /*:unknown*/ = $(`y`, `one`);
$(false, `middle`);
const a /*:boolean*/ = b === c;
$(a, `end`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "x", "one" );
const b = $( "y", "one" );
$( false, "middle" );
const c = a === b;
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
