# Preval test case

# if_false_if_true.md

> Ifelse > Back2back > If false if true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(false, 'a');
if (x) {
  $(x, 'pass');
  x = $(true, 'b');
  if (x) {
    $(x, 'hit');
  } else {
  }
} else {
}
`````

## Output

`````js filename=intro
const x = $(false, 'a');
if (x) {
  $(x, 'pass');
  const tmpSSA_x = $(true, 'b');
  if (tmpSSA_x) {
    $(tmpSSA_x, 'hit');
  } else {
  }
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
