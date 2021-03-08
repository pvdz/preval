# Preval test case

# both_true_else_false.md

> Ifelse > Back2back > Both true else false
>
> Back to back if statements on same ident may be simplified

#TODO

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

## Normalized

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

## Output

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

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'A'
 - 3: 0
 - 4: 0, 'hit'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same