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
let f = function (tmpParamDefault, tmpParamDefault$1) {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = 1;
  } else {
    a = tmpParamDefault;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamDefault$1 === undefined;
  if (tmpIfTest$1) {
    b = a;
  } else {
    b = tmpParamDefault$1;
  }
};
f();
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault, tmpParamDefault$1) {};
f();
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
