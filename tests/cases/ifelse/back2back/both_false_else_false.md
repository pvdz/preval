# Preval test case

# both_false_else_false.md

> Ifelse > Back2back > Both false else false
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
} else {
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
} else {
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
} else {
  $(x, `hit`);
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
} else {
  $(x, `hit`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'B'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
