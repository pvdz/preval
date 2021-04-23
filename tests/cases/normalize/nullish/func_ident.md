# Preval test case

# func_ident.md

> Normalize > Nullish > Func ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $("foo"??foo);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return $('foo' ?? foo);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  let tmpCalleeParam = 'foo';
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function () {
    debugger;
    tmpCalleeParam = foo;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $('foo');
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
