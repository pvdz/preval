# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  let tmpCalleeParam = parseInt(15);
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = foo;
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
function f() {
  let tmpCalleeParam = parseInt(15);
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = foo;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: 15
 - 2: 15
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
