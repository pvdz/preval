# Preval test case

# both_true_else_false.md

> Ifelse > Back2back > Both true else false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(0);
} else {
  $(x, 'B');
  x = $(0);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Pre Normal


`````js filename=intro
let x = $(1);
if (x) {
  $(x, `A`);
  x = $(0);
} else {
  $(x, `B`);
  x = $(0);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(1);
if (x) {
  $(x, `A`);
  x = $(0);
} else {
  $(x, `B`);
  x = $(0);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(1);
if (x) {
  $(x, `A`);
  x = $(0);
} else {
  $(x, `B`);
  x = $(0);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  $( a, "A" );
  a = $( 0 );
}
else {
  $( a, "B" );
  a = $( 0 );
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
 - 1: 1
 - 2: 1, 'A'
 - 3: 0
 - 4: 0, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
