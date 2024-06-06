# Preval test case

# both_true_both_true.md

> Ifelse > Back2back > Both true both true
>
> Back to back if statements on same ident may be simplified

#TODO

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
  $(x, 'one');
} else {
  $(x, 'two');
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
  $(x, `one`);
} else {
  $(x, `two`);
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
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Output


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
  $(x, `one`);
} else {
  $(x, `two`);
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
  $( a, "one" );
}
else {
  $( a, "two" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'A'
 - 3: true, 'b'
 - 4: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
