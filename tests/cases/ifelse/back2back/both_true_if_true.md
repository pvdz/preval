# Preval test case

# both_true_if_true.md

> Ifelse > Back2back > Both true if true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'A');
  x = $(true, 'b');
} else {
  $(x, 'B');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## Output


`````js filename=intro
let x /*:unknown*/ = $(true, `a`);
if (x) {
  $(x, `A`);
  x = $(true, `b`);
} else {
  $(x, `B`);
  x = $(true, `b`);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true, "a" );
if (a) {
  $( a, "A" );
  a = $( true, "b" );
}
else {
  $( a, "B" );
  a = $( true, "b" );
}
if (a) {
  $( a, "hit" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'A'
 - 3: true, 'b'
 - 4: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
