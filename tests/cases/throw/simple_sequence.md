# Preval test case

# simple_sequence.md

> Throw > Simple sequence
>
> Returning a sequence that ends in a simple node

#TODO

## Input

`````js filename=intro
function f(){ 
  throw ($(1), $(2), null);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  throw ($(1), $(2), null);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  $(2);
  const tmpThrowArg = null;
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
throw null;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw null;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ null ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
