# Preval test case

# both_false_both_true.md

> Ifelse > Back2back > Both false both true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
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
let x = $(false, `a`);
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
let x = $(false, `a`);
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
let x = $(false, `a`);
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

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'B'
 - 3: true, 'b'
 - 4: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
