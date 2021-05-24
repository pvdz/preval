# Preval test case

# if_true_else_false.md

> Ifelse > Back2back > If true else false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(true, 'a');
if (x) {
  $(x, 'pass');
  x = $(false, 'b');
  if (x) {
  } else {
    $(x, 'hit');
  }
} else {
  $(x, 'hit');
}
`````

## Output

`````js filename=intro
const x = $(true, 'a');
if (x) {
  $(x, 'pass');
  const tmpClusterSSA_x = $(false, 'b');
  if (tmpClusterSSA_x) {
  } else {
    $(tmpClusterSSA_x, 'hit');
  }
} else {
  $(x, 'hit');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
