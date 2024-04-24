# Preval test case

# if_true_both_false.md

> Ifelse > Back2back > If true both false
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
  $(x, 'one');
} else {
  $(x, 'two');
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
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Normalized

`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
  if (x) {
    $(x, `one`);
  } else {
    $(x, `two`);
  }
} else {
  $(x, `two`);
}
`````

## Output

`````js filename=intro
let x = $(true, `a`);
if (x) {
  $(x, `pass`);
  x = $(false, `b`);
  if (x) {
    $(x, `one`);
  } else {
    $(x, `two`);
  }
} else {
  $(x, `two`);
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
    $( a, "one" );
  }
  else {
    $( a, "two" );
  }
}
else {
  $( a, "two" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true, 'a'
 - 2: true, 'pass'
 - 3: false, 'b'
 - 4: false, 'two'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
