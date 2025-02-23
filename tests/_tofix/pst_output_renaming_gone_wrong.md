# Preval test case

# pst_output_renaming_gone_wrong.md

> Tofix > pst output renaming gone wrong
>
> The PST output is renaming a var to a global that was seen. It should not use `a`

## Input

`````js filename=intro
{
  let x = 20;
  {
    $(a); // 20
    if ($(1)) {
      $(x); // 20
      x = 30; // overwrites the 20
    }
    $(x); // 20, 30
    if ($(2)) {
      $(x); // 20, 30
      x = 40; // overwrites the 20 and 30
    }
    $(x); // 20, 30, 40
  }
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 20;
  {
    $(a);
    if ($(1)) {
      $(x);
      x = 30;
    }
    $(x);
    if ($(2)) {
      $(x);
      x = 40;
    }
    $(x);
  }
}
`````

## Normalized


`````js filename=intro
let x = 20;
$(a);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(x);
  x = 30;
} else {
}
$(x);
const tmpIfTest$1 = $(2);
if (tmpIfTest$1) {
  $(x);
  x = 40;
} else {
}
$(x);
`````

## Output


`````js filename=intro
let x /*:number*/ = 20;
$(a);
const tmpIfTest /*:unknown*/ = $(1);
$(20);
if (tmpIfTest) {
  x = 30;
  $(30);
} else {
}
const tmpIfTest$1 /*:unknown*/ = $(2);
$(x);
if (tmpIfTest$1) {
  $(40);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 20;
$( a );
const b = $( 1 );
$( 20 );
if (b) {
  a = 30;
  $( 30 );
}
const c = $( 2 );
$( a );
if (c) {
  $( 40 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
