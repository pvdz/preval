# Preval test case

# call_prop.md

> Normalize > Member access > Statement > Func > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  $('foo').length;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  $('foo').length;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCompObj = $('foo');
  tmpCompObj.length;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCompObj = $('foo');
tmpCompObj.length;
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
