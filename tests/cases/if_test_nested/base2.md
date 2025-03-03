# Preval test case

# base2.md

> If test nested > Base2
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  $(1);
  if ($(2)) $(3);
  if (!x) {
    $('pass');
  } else {
    $('fail');
  }
}
`````

## Pre Normal


`````js filename=intro
const x = $();
if (x) {
  $(1);
  if ($(2)) $(3);
  if (!x) {
    $(`pass`);
  } else {
    $(`fail`);
  }
}
`````

## Normalized


`````js filename=intro
const x = $();
if (x) {
  $(1);
  const tmpIfTest = $(2);
  if (tmpIfTest) {
    $(3);
  } else {
  }
  if (x) {
    $(`fail`);
  } else {
    $(`pass`);
  }
} else {
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  $(1);
  const tmpIfTest /*:unknown*/ = $(2);
  if (tmpIfTest) {
    $(3);
  } else {
  }
  $(`fail`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  const b = $( 2 );
  if (b) {
    $( 3 );
  }
  $( "fail" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
