# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
function f() {
  return $('foo'??length);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  let tmpCalleeParam = 'foo';
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = length;
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
