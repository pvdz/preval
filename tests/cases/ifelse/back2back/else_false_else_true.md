# Preval test case

# else_false_else_true.md

> Ifelse > Back2back > Else false else true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, 'pass');
  x = $(true);
}
if (x) {
} else {
  $(x, 'hit');
}
`````

## Normalized

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, 'pass');
  x = $(true);
  if (x) {
  } else {
    $(x, 'hit');
  }
}
`````

## Output

`````js filename=intro
const x = $(false);
if (x) {
} else {
  $(x, 'pass');
  const SSA_x = $(true);
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
 - 1: false
 - 2: false, 'pass'
 - 3: true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
