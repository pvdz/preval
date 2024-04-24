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
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
}
if (x) {
} else {
  $(x, `hit`);
}
`````

## Normalized

`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
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
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
  if (x) {
  } else {
    $(x, `hit`);
  }
} else {
  $(x, `hit`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( true, "a" );
if (a) {
  $( a, "pass" );
  a = $( false, "b" );
  if (a) {

  }
  else {
    $( a, "hit" );
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
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: false, 'b'
 - 4: false, 'hit'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
