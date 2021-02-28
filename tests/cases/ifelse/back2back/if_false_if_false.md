# Preval test case

# if_false_if_false.md

> Ifelse > Back2back > If false if false
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
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
  $(x, 'pass');
  x = $(false, 'b');
  if (x) {
    $(x, 'hit');
  }
}
`````

## Output

`````js filename=intro
const x = $(false, 'a');
if (x) {
  $(x, 'pass');
  const SSA_x = $(false, 'b');
  if (SSA_x) {
    $(SSA_x, 'hit');
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
