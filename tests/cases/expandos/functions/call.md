# Preval test case

# call.md

> Expandos > Functions > Call
>
> Basic expando stuff

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
}
f.foo = function(){ $('pass'); };
$(f.foo());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
f.foo = function () {
  debugger;
  $(`pass`);
};
$(f.foo());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const tmpAssignMemLhsObj = f;
const tmpAssignMemRhs = function () {
  debugger;
  $(`pass`);
  return undefined;
};
tmpAssignMemLhsObj.foo = tmpAssignMemRhs;
const tmpCallCallee = $;
const tmpCalleeParam = f.foo();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(`pass`);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( "pass" );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
