# Preval test case

# else_true_both_false.md

> Ifelse > Back2back > Else true both false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(true, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(false, 'b');
}
if (x) {
  $(x, 'one');
} else {
  $(x, 'two');
}
`````

## Pre Normal


`````js filename=intro
let x = $(true, `a`);
if (x) {
} else {
  $(x, `pass`);
  x = $(false, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Normalized


`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `one`);
} else {
  $(x, `pass`);
  x = $(false, `b`);
  if (x) {
    $(x, `one`);
  } else {
    $(x, `two`);
  }
}
`````

## Output


`````js filename=intro
const x = $(true, `a`);
if (x) {
  $(x, `one`);
} else {
  $(x, `pass`);
  const tmpClusterSSA_x = $(false, `b`);
  if (tmpClusterSSA_x) {
    $(tmpClusterSSA_x, `one`);
  } else {
    $(tmpClusterSSA_x, `two`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true, "a" );
if (a) {
  $( a, "one" );
}
else {
  $( a, "pass" );
  const b = $( false, "b" );
  if (b) {
    $( b, "one" );
  }
  else {
    $( b, "two" );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
