# Preval test case

# else_false_if_false.md

> Ifelse > Back2back > Else false if false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
let x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'pass'
 - 3: false, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
