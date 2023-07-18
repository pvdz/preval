# Preval test case

# unused.md

> Normalize > Function > Decl > Unused
>
> An unused func decl should be removed

#TODO

## Input

`````js filename=intro
let x = 1; // This can not be inlined as long as function f exists... but it is not used!
function f() {
  x = 2;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
};
let x = 1;
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  x = 2;
  return undefined;
};
let x = 1;
$(x);
`````

## Output

`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
