# Preval test case

# base.md

> If test nested > Base
>
> When a const is tested twice, the second test is gonna have the same outcome as the first

## Input

`````js filename=intro
const x = $();
if (x) {
  $(1);
  if (x) {
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
  if (x) {
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
  if (x) {
    $(`pass`);
  } else {
    $(`fail`);
  }
} else {
}
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  $(1);
  $(`pass`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  $( "pass" );
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
