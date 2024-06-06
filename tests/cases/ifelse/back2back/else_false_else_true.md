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

## Pre Normal

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, `pass`);
  x = $(true);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized

`````js filename=intro
let x = $(false);
if (x) {
} else {
  $(x, `pass`);
  x = $(true);
  if (x) {
  } else {
    $(x, `hit`);
  }
}
`````

## Output

`````js filename=intro
const x = $(false);
if (x) {
} else {
  $(x, `pass`);
  const tmpClusterSSA_x = $(true);
  if (tmpClusterSSA_x) {
  } else {
    $(tmpClusterSSA_x, `hit`);
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( false );
if (a) {

}
else {
  $( a, "pass" );
  const b = $( true );
  if (b) {

  }
  else {
    $( b, "hit" );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
