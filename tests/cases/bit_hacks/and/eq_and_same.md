# Preval test case

# eq_and_same.md

> Bit hacks > And > Eq and same
>
> The and is subsumed by the eq

## Input

`````js filename=intro
const a = $(33);
if (a === 33) {
  if (a & 32) {
    $('pass');
  }
}
`````

## Pre Normal


`````js filename=intro
const a = $(33);
if (a === 33) {
  if (a & 32) {
    $(`pass`);
  }
}
`````

## Normalized


`````js filename=intro
const a = $(33);
const tmpIfTest = a === 33;
if (tmpIfTest) {
  const tmpIfTest$1 = a & 32;
  if (tmpIfTest$1) {
    $(`pass`);
  } else {
  }
} else {
}
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(33);
const tmpIfTest /*:boolean*/ = a === 33;
if (tmpIfTest) {
  $(`pass`);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 33 );
const b = a === 33;
if (b) {
  $( "pass" );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 33
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
