# Preval test case

# both_false_else_true.md

> Ifelse > Back2back > Both false else true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false);
if (x) {
  $(x, 'A');
  x = $(true);
} else {
  $(x, 'B');
  x = $(true);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Pre Normal


`````js filename=intro
let x = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Output


`````js filename=intro
let x = $(false);
if (x) {
  $(x, `A`);
  x = $(true);
} else {
  $(x, `B`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( false );
if (a) {
  $( a, "A" );
  a = $( true );
}
else {
  $( a, "B" );
  a = $( true );
}
if (a) {

}
else {
  $( a, "hit" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: false, 'B'
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
