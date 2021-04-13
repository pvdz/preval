# Preval test case

# group_ident.md

> Normalize > Member access > Statement > Func > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  ($(1), $).length;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  ($(1), $).length;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  const tmpCompObj = $;
  tmpCompObj.length;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$.length;
$(undefined);
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
