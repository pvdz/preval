# Preval test case

# nested_order.md

> normalize > hoisting > func > nested_order
>
> How do we normalize multiple func decls on the same level?

## Input

`````js filename=intro
$(f());
function f() {
  $(f(), g(), h());
    
  function f() { return $(); }
  function g() { return $(); }
  function h() { return $(); }
}
`````

## Normalized

`````js filename=intro
function f() {
  function f_1() {
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  function h() {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f_1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f() {
  function f_1() {
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  function h() {
    const tmpReturnArg$2 = $();
    return tmpReturnArg$2;
  }
  const tmpCallCallee = $;
  const tmpCalleeParam = f_1();
  const tmpCalleeParam$1 = g();
  const tmpCalleeParam$2 = h();
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: 
 - 3: 
 - 4: undefined, undefined, undefined
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
