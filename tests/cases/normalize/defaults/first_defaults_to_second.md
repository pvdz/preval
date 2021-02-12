# Preval test case

# first_defaults_to_second.md

> normalize > defaults > first_defaults_to_second
>
> Rewrite function param defaults to equivalent body code

TDZ case

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let a = undefined;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    a = b;
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
    a = b;
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
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
