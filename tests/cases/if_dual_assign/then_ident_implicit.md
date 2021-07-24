# Preval test case

# then_ident_implicit.md

> If dual assign > Then ident implicit
>
> This case should make sure we don't accidentally set a var to a value it should not be having

#TODO

## Input

`````js filename=intro
let x = false;
//const b = $('x', 'one');
//const c = $('x', 'one');
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
const a = b === c;
if (a) {
  $(true, `middle`);
  $(true, `end`);
} else {
  $(false, `middle`);
  $(false, `end`);
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, c

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
