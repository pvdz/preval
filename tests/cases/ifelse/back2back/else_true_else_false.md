# Preval test case

# else_true_else_false.md

> Ifelse > Back2back > Else true else false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(1);
if (x) {
} else {
  $(x, 'pass');
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
} else {
  $(x, 'pass');
  x = $(0);
  if (x) {
  } else {
    $(x, 'hit');
  }
}
`````

## Output

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(x, 'pass');
  const SSA_x = $(0);
  if (SSA_x) {
  } else {
    $(SSA_x, 'hit');
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
