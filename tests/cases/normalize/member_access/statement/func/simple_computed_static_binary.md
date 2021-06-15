# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Statement > Func > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj['fo' + 'o'];
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { foo: 10 };
  obj[`fo` + `o`];
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = `foo`;
  tmpCompObj[tmpCompProp];
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
