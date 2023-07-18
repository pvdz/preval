# Preval test case

# unused_complex.md

> Normalize > Return > Unused complex
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  $(1); // spike it
  return;
}

$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
