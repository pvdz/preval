# Preval test case

# if-else-then.md

> Ifelse > If-else-then
>
> This should be abstracted

## Input

`````js filename=intro
function f() {
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(`A`);
  if ($(1)) {
    $(`B`);
  } else {
    $(`C`);
  }
  $(`D`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(`A`);
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(`B`);
  } else {
    $(`C`);
  }
  $(`D`);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(`A`);
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(`B`);
} else {
  $(`C`);
}
$(`D`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "A" );
const a = $( 1 );
if (a) {
  $( "B" );
}
else {
  $( "C" );
}
$( "D" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'A'
 - 2: 1
 - 3: 'B'
 - 4: 'D'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
