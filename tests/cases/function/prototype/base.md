# Preval test case

# base.md

> Function > Prototype > Base
>
> The function prototype should resolve to a standard symbol

#TODO

## Input

`````js filename=intro
$(function(){}.prototype);
`````

## Pre Normal

`````js filename=intro
$(
  function () {
    debugger;
  }.prototype,
);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCompObj = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam = tmpCompObj.prototype;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$($FunctionPrototype);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: '<function>'
 - eval returned: undefined
