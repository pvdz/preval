# Preval test case

# decl_after_tdz.md

> Normalize > Dce > Return > Decl after tdz
>
> This is TDZ

## Input

`````js filename=intro
let tmpCallComplexCallee = undefined;
$inlinedFunction:
{
  // This function makes x a closure and much harder to statically
  // detect it being a TDZ error. It's easy to detect in single scope.
  const f = function() {
    x; // Do not eliminate. This is TDZ.
    $(0);
    return undefined;
  };
  tmpCallComplexCallee = f;
  break $inlinedFunction;
  const x = undefined;
}
tmpCallComplexCallee();
`````

## Pre Normal


`````js filename=intro
let tmpCallComplexCallee = undefined;
$inlinedFunction: {
  const f = function () {
    debugger;
    null;
    $(0);
    return undefined;
  };
  tmpCallComplexCallee = f;
  break $inlinedFunction;
  const x = undefined;
}
tmpCallComplexCallee();
`````

## Normalized


`````js filename=intro
let tmpCallComplexCallee = undefined;
$inlinedFunction: {
  const f = function () {
    debugger;
    $(0);
    return undefined;
  };
  tmpCallComplexCallee = f;
  break $inlinedFunction;
  const x = undefined;
}
tmpCallComplexCallee();
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: BAD?!
 - 1: 0
 - eval returned: undefined

Final output calls: BAD!!
 - 1: 0
 - eval returned: undefined
