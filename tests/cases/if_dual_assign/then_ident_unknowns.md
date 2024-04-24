# Preval test case

# then_ident_unknowns.md

> If dual assign > Then ident unknowns
>
> This case should make sure we don't accidentally set a var to a value it should not be having

#TODO

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
let x = false;
const b = $(`x`, `one`);
const c = $(`y`, `one`);
const a = b === c;
if (a) {
  x = true;
  $(true, `middle`);
  $(true, `end`);
} else {
  $(x, `middle`);
  $(false, `end`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
const b = $( "x", "one" );
const c = $( "y", "one" );
const d = b === c;
if (d) {
  a = true;
  $( true, "middle" );
  $( true, "end" );
}
else {
  $( a, "middle" );
  $( false, "end" );
}
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
