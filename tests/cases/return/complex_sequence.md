# Preval test case

# complex_sequence.md

> Return > Complex sequence
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  return ($(1), $(2), $(3));
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(1), $(2), $(3);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpReturnArg = $(3);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpReturnArg /*:unknown*/ = $(3);
$(tmpReturnArg);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
