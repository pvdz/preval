# Preval test case

# both_false_if_false.md

> Ifelse > Back2back > Both false if false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'A');
  x = $(false, 'b');
} else {
  $(x, 'B');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
  $(x, `hit`);
}
`````

## Normalized

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## Output

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `A`);
  x = $(false, `b`);
} else {
  $(x, `B`);
  x = $(false, `b`);
}
if (x) {
  $(x, `hit`);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'B'
 - 3: false, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
