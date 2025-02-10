# Preval test case

# tryed.md

> Redundant writes > Tryed
>
> We can observe the initial value if we try/catch the if

## Input

`````js filename=intro
let n = 1;
try {
  if ($(true)) {
    n = $('throws 2');
  } else {
    n = $('throws 3');
  }
} catch {

}
$(n);
`````

## Pre Normal


`````js filename=intro
let n = 1;
try {
  if ($(true)) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(n);
`````

## Normalized


`````js filename=intro
let n = 1;
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(n);
`````

## Output


`````js filename=intro
let n = 1;
try {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    n = $(`throws 2`);
  } else {
    n = $(`throws 3`);
  }
} catch (e) {}
$(n);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
try {
  const b = $( true );
  if (b) {
    a = $( "throws 2" );
  }
  else {
    a = $( "throws 3" );
  }
}
catch (c) {

}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'throws 2'
 - 3: 'throws 2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
