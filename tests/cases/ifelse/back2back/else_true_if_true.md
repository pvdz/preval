# Preval test case

# else_true_if_true.md

> Ifelse > Back2back > Else true if true
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(true, 'b');
}
if (x) {
  $(x, 'hit');
}
`````

## Pre Normal


`````js filename=intro
let x = $(true, `a`);
if (x) {
} else {
  $(x, `pass`);
  x = $(true, `b`);
}
if (x) {
  $(x, `hit`);
}
`````

## Normalized


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  x = $(true, `b`);
  if (x) {
    $(x, `hit`);
  } else {
  }
}
`````

## Output


`````js filename=intro
const x = $(true, `a`);
if (x) {
  $(x, `hit`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `hit`);
  } else {
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true, "a" );
if (a) {
  $( a, "hit" );
}
else {
  $( a, "pass" );
  const b = $( true, "b" );
  if (b) {
    $( b, "hit" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
