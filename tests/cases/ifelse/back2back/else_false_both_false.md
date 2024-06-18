# Preval test case

# else_false_both_false.md

> Ifelse > Back2back > Else false both false
>
> Back to back if statements on same ident may be simplified

## Input

`````js filename=intro
let x = $(false, 'a');
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
let x = $(false, `a`);
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
let x = $(false, `a`);
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
const x = $(false, `a`);
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
const a = $( false, "a" );
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
 - 1: false, 'a'
 - 2: false, 'pass'
 - 3: false, 'b'
 - 4: false, 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
