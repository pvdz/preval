# Preval test case

# else_false_else_false.md

> Ifelse > Back2back > Else false else false
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
} else {
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
  if (x) {
  } else {
    $(x, 'hit');
  }
}
`````

## Output

`````js filename=intro
const x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  const SSA_x = $(false, 'b');
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
 - 1: false, 'a'
 - 2: false, 'pass'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same