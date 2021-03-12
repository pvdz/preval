# Preval test case

# second_defaults_to_first_2.md

> Normalize > Defaults > Second defaults to first 2
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = 1, b = a) { 
}

f()
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern, $tdz$__pattern$1) {
  let a = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    a = 1;
  } else {
    a = $tdz$__pattern;
  }
  let b = undefined;
  const tmpIfTest$1 = $tdz$__pattern$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = $tdz$__pattern$1;
  }
};
f();
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern, $tdz$__pattern$1) {};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
