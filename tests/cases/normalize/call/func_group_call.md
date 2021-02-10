# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $(parseInt))()
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $(parseInt);
  const y = tmpCallCallee();
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
