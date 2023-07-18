# Preval test case

# else_false_if_true.md

> Ifelse > Back2back > Else false if true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, 'pass');
  x = $(true);
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, `pass`);
  x = $(true);
}
if (x) {
  $(x, `hit`);
}
`````

## Normalized

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, `pass`);
  x = $(true);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## Output

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, `pass`);
  x = $(true);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( false );
if (a) {

}
else {
  $( a, "pass" );
  a = $( true );
}
if (a) {
  $( a, "hit" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false, 'pass'
 - 3: true
 - 4: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
