# Preval test case

# one.md

> Normalize > Defaults > One
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let a = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = 'foo';
    return a;
  } else {
    a = $tdz$__pattern;
    return a;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('x');
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    return 'foo';
  } else {
    return $tdz$__pattern;
  }
};
const tmpCalleeParam = f('x');
$(tmpCalleeParam);
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
