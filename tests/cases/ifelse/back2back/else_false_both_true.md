# Preval test case

# else_false_both_true.md

> Ifelse > Back2back > Else false both true
>
> Back to back if statements on same ident may be simplified

#TODO

## Input

`````js filename=intro
let x = $(false, 'a');
if (x) {
} else {
  $(x, 'pass');
  x = $(true, 'b');
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
  x = $(true, `b`);
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
} else {
  $(x, `pass`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## Output


`````js filename=intro
let x = $(false, `a`);
if (x) {
} else {
  $(x, `pass`);
  x = $(true, `b`);
}
if (x) {
  $(x, `one`);
} else {
  $(x, `two`);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( false, "a" );
if (a) {

}
else {
  $( a, "pass" );
  a = $( true, "b" );
}
if (a) {
  $( a, "one" );
}
else {
  $( a, "two" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false, 'a'
 - 2: false, 'pass'
 - 3: true, 'b'
 - 4: true, 'one'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
