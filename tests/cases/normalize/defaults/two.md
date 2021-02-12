# Preval test case

# two.md

> normalize > defaults > two
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = "bar") { 
  return [a, b]; 
}

$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let a = undefined;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    a = 'foo';
  } else {
    a = $tdz$__a;
  }
  let b = undefined;
  const tmpIfTest$1 = $tdz$__b === undefined;
  if (tmpIfTest$1) {
    b = 'bar';
  } else {
    b = $tdz$__b;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('x');
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f(undefined, 'y');
tmpCallCallee$2(tmpCalleeParam$2);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f('x', 'y');
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let a = undefined;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    a = 'foo';
  } else {
    a = $tdz$__a;
  }
  let b = undefined;
  const tmpIfTest$1 = $tdz$__b === undefined;
  if (tmpIfTest$1) {
    b = 'bar';
  } else {
    b = $tdz$__b;
  }
  const tmpReturnArg = [a, b];
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 = f('x');
$(tmpCalleeParam$1);
const tmpCalleeParam$2 = f(undefined, 'y');
$(tmpCalleeParam$2);
const tmpCalleeParam$3 = f('x', 'y');
$(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: ['foo', 'bar']
 - 2: ['x', 'bar']
 - 3: ['foo', 'y']
 - 4: ['x', 'y']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
