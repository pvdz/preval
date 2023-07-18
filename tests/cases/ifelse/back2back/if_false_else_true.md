# Preval test case

# if_false_else_true.md

> Ifelse > Back2back > If false else true
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
} else {
  $(x, 'hit');
}
`````

## Pre Normal

`````js filename=intro
let x = $(false, `a`);
if (x) {
  $(x, `pass`);
  x = $(true, `b`);
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
  $(x, `pass`);
  x = $(true, `b`);
  if (x) {
  } else {
    $(x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## Output

`````js filename=intro
const x = $(false, `a`);
if (x) {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true, `b`);
  if (tmpClusterSSA_x) {
  } else {
    $(tmpClusterSSA_x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false, "a" );
if (a) {
  $( a, "pass" );
  const b = $( true, "b" );
  if (b) {

  }
  else {
    $( b, "hit" );
  }
}
else {
  $( a, "hit" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
