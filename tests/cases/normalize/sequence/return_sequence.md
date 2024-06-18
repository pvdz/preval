# Preval test case

# return_sequence.md

> Normalize > Sequence > Return sequence
>
> Returning a sequence

## Input

`````js filename=intro
function f() {
  return ($(1), $(2))
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(1), $(2);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
const tmpReturnArg = $(2);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
