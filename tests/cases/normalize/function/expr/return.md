# Preval test case

# return.md

> Normalize > Function > Expr > Return
>
> a func expr is slightly different from func expr

#TODO

## Input

`````js filename=intro
const f = function g() {
  return $(1)
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function g() {
  debugger;
  return $(1);
};
$(f());
`````

## Normalized

`````js filename=intro
const g = function () {
  debugger;
  const tmpReturnArg = $(1);
  return tmpReturnArg;
};
const f = g;
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
