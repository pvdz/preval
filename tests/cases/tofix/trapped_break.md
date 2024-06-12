# Preval test case

# trapped_break.md

> Tofix > Trapped break
>
> Breaks can't possibly throw

#TODO

## Input

`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x); // x=1
`````

## Pre Normal


`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x);
`````

## Output


`````js filename=intro
let x = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  } catch (e) {}
  x = 2;
}
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
$inlinedFunction: {
  try {
    break $inlinedFunction;
  }
catch (b) {

  }
  a = 2;
}
$( a );
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
