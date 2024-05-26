# Preval test case

# alt_ssa.md

> Tofix > Alt ssa
>
> Not sure but if a=2 is mimicked with a local const then the next 
> two reads can point to it and we can trivially inline them. Big deal?

#TODO

## Input

`````js filename=intro
let a = 1;
if ($()) {
  $(a); // can observe 1
  a = 2;
  // const aa = 2;  <- and replace the next two reads to 2 with aa 
  if (a) {
    $(a); // can observe 2
    a = 3;
  }
}
$(a); // can observe  1 2 3
`````

## Pre Normal

`````js filename=intro
let a = 1;
if ($()) {
  $(a);
  a = 2;
  if (a) {
    $(a);
    a = 3;
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
const tmpIfTest = $();
if (tmpIfTest) {
  $(a);
  a = 2;
  if (a) {
    $(a);
    a = 3;
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
let a = 1;
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
  a = 2;
  $(2);
  a = 3;
  $(3);
} else {
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
const b = $();
if (b) {
  $( 1 );
  a = 2;
  $( 2 );
  a = 3;
  $( 3 );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same