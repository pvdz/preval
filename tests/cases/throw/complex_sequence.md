# Preval test case

# complex_sequence.md

> Throw > Complex sequence
>
> Returning a sequence that ends in a simple node

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), $(3));
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  throw ($(1), $(2), $(3));
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpThrowArg = $(3);
  throw tmpThrowArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpThrowArg /*:unknown*/ = $(3);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: ('<crash[ 3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
