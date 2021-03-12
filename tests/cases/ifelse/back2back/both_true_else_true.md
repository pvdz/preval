# Preval test case

# both_true_else_true.md

> Ifelse > Back2back > Both true else true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(1);
} else {
  $(x, 'B');
  x = $(1);
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
  $(x, 'A');
  x = $(1);
} else {
  $(x, 'B');
  x = $(1);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(1);
} else {
  $(x, 'B');
  x = $(1);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  $(x, 'A');
  x = $(1);
} else {
  $(x, 'B');
  x = $(1);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'A'
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
